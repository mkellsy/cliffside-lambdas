import * as Interfaces from "@mkellsy/hap-device";

import { ContactControl } from "./ContactControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { KeypadControl } from "./KeypadControl";
import { Lambda } from "../Interfaces/Lambda";
import { StateManager } from "./StateManager";
import { SwitchControl } from "../Modules/SwitchControl";

/**
 * Defines how multiple keypad buttons with LEDs interact with a set of raise
 * and lower buttons.
 */
export class LEDControl {
    /**
     * Selects a device to be controlled.
     *
     * @param keypads A list of mapped keypad ids.
     * @param group A group of devices to assign the keypad.
     * @param state A reference to this object for cache.
     *
     * @returns A Lambda function to ass to the lambda list.
     */
    public static select(keypads: string[], group: DeviceGroup, state: StateManager): Lambda {
        return {
            button: group.button,

            action: (button: Interfaces.Button, action: Interfaces.Action, devices: Map<string, Interfaces.Device>) => {
                if (action !== "Press") {
                    return;
                }

                for (let i = 0; i < keypads.length; i++) {
                    const target = devices.get(keypads[i]);

                    if (target == null || target.type !== Interfaces.DeviceType.Keypad) {
                        continue;
                    }

                    KeypadControl.select(target, button);
                }

                if (state.is(group)) {
                    for (let i = 0; i < group.devices.length; i++) {
                        const target = devices.get(group.devices[i]);

                        if (target != null) {
                            if (target.capabilities.speed != null) {
                                FanControl.toggle(target);
                            } else if (target.capabilities.level != null) {
                                DimmerControl.toggle(target);
                            } else if (
                                target.capabilities.state != null &&
                                target.capabilities.state.values != null &&
                                target.capabilities.state.values.indexOf("On") >= 0 &&
                                target.capabilities.state.values.indexOf("Off") >= 0
                            ) {
                                SwitchControl.toggle(target);
                            } else if (
                                target.capabilities.state != null &&
                                target.capabilities.state.values != null &&
                                target.capabilities.state.values.indexOf("Open") >= 0 &&
                                target.capabilities.state.values.indexOf("Closed") >= 0
                            ) {
                                ContactControl.toggle(target);
                            }
                        }
                    }
                }

                state.set(group);
            },
        };
    }

    /**
     * Defines the off lambda action for the currently selected group.
     *
     * @param keypads A list of mapped keypad ids.
     * @param group A group of devices to assign the keypad.
     * @param state A reference to this object for cache.
     *
     * @returns A Lambda function to ass to the lambda list.
     */
    public static off(keypads: string[], group: DeviceGroup, state: StateManager): Lambda {
        return {
            button: group.button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ) => {
                if (action !== "Press") {
                    return;
                }

                for (let i = 0; i < keypads.length; i++) {
                    const target = devices.get(keypads[i]);

                    if (target == null || target.type !== Interfaces.DeviceType.Keypad) {
                        continue;
                    }

                    KeypadControl.reset(target);
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target != null) {
                        if (target.capabilities.speed != null) {
                            FanControl.off(target);
                        } else if (target.capabilities.level != null) {
                            DimmerControl.off(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            SwitchControl.off(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("Open") >= 0 &&
                            target.capabilities.state.values.indexOf("Closed") >= 0
                        ) {
                            ContactControl.off(target);
                        }
                    }
                }

                state.reset();
            },
        };
    }

    /**
     * Defines the raise lambda action for the currently selected group.
     *
     * @param button The id of the raise button.
     * @param state A reference to this object for cache.
     *
     * @returns A Lambda function to ass to the lambda list.
     */
    public static raise(button: string, state: StateManager): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ) => {
                const group = state.get();

                if (group == null || action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        FanControl.raise(target);
                    } else if (target.capabilities.level != null) {
                        DimmerControl.raise(target);
                    }
                }
            },
        };
    }

    /**
     * Defines the lower lambda action for the currently selected group.
     *
     * @param button The id of the lower button.
     * @param state A reference to this object for cache.
     *
     * @returns A Lambda function to ass to the lambda list.
     */
    public static lower(button: string, state: StateManager): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ) => {
                const group = state.get();

                if (group == null || action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        FanControl.lower(target);
                    } else if (target.capabilities.level != null) {
                        DimmerControl.lower(target);
                    }
                }
            },
        };
    }
}
