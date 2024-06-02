import * as Interfaces from "@mkellsy/hap-device";

import { ContactControl } from "./ContactControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { Lambda } from "../Interfaces/Lambda";
import { StateManager } from "./StateManager";
import { SwitchControl } from "./SwitchControl";

/**
 * Defines how multiple keypad buttons with LEDs interact with a set of raise
 * and lower buttons.
 */
export class KeypadControl {
    /**
     * Selects a device to be controlled.
     *
     * @param keypads A list of mapped keypad ids.
     * @param group A group of devices to assign the keypad.
     * @param state A reference to this object for cache.
     *
     * @returns A Lambda function to ass to the lambda list.
     */
    public static select(group: DeviceGroup, state: StateManager): Lambda {
        return {
            button: group.button,

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
                if (action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target != null && target.manufacturer !== "Lutron Electronics Co., Inc") {
                        if (target.capabilities.speed != null) {
                            await FanControl.toggle(target);
                        } else if (target.capabilities.level != null) {
                            await DimmerControl.toggle(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            await SwitchControl.toggle(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("Open") >= 0 &&
                            target.capabilities.state.values.indexOf("Closed") >= 0
                        ) {
                            await ContactControl.toggle(target);
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
    public static off(group: DeviceGroup, state: StateManager): Lambda {
        return {
            button: group.button,

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
                if (action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target != null) {
                        if (target.capabilities.speed != null) {
                            await FanControl.off(target);
                        } else if (target.capabilities.level != null) {
                            await DimmerControl.off(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            await SwitchControl.off(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("Open") >= 0 &&
                            target.capabilities.state.values.indexOf("Closed") >= 0
                        ) {
                            await ContactControl.off(target);
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

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
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
                        await FanControl.raise(target);
                    } else if (target.capabilities.level != null) {
                        await DimmerControl.raise(target);
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

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
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
                        await FanControl.lower(target);
                    } else if (target.capabilities.level != null) {
                        await DimmerControl.lower(target);
                    }
                }
            },
        };
    }
}
