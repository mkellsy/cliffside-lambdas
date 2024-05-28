import * as Interfaces from "@mkellsy/hap-device";

import { ContactControl } from "./ContactControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { Lambda } from "../Interfaces/Lambda";
import { SwitchControl } from "./SwitchControl";

/**
 * Defines how multiple pico buttons interact with a control pico.
 */
export class ButtonControl {
    private currentGroup?: DeviceGroup;

    /**
     * Selects a device to be controled.
     *
     * @param group A mapped device group.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static select(group: DeviceGroup, control: ButtonControl): Lambda {
        return {
            button: group.button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action
            ) => {
                if (action !== "Press") {
                    return;
                }

                control.set(group);
            }
        };
    }

    /**
     * Creates the on lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static on(button: string, control: ButtonControl): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = control.get();

                if (group == null || action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);
        
                    if (target != null) {
                        if (target.capabilities.speed != null) {
                            FanControl.on(target);
                        } else if (target.capabilities.level != null) {
                            DimmerControl.on(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            SwitchControl.on(target);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("Open") >= 0 &&
                            target.capabilities.state.values.indexOf("Closed") >= 0
                        ) {
                            ContactControl.on(target);
                        }
                    }
                }
            }
        };
    }

    /**
     * Creates the off lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static off(button: string, control: ButtonControl): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = control.get();

                if (group == null || action !== "Press") {
                    return;
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
            }
        };
    }
    
    /**
     * Creates the raise lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static raise(button: string, control: ButtonControl): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = control.get();

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
            }
        };
    }

    /**
     * Creates the lower lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static lower(button: string, control: ButtonControl): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = control.get();

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
            }
        };
    }

    /**
     * Creates the favorite lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param control A reference to this control object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static favorite(button: string, control: ButtonControl): Lambda {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = control.get();

                if (group == null || action !== "Press") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        FanControl.favorite(target);
                    } else if (target.capabilities.level != null) {
                        DimmerControl.favorite(target);
                    }
                }
            }
        };
    }

    /**
     * Sets a group as currently selected.
     *
     * @param group A device group object to select.
     */
    public set(group: DeviceGroup): void {
        this.currentGroup = group;
    }

    /**
     * Gets the currently selected group.
     *
     * @returns A device group object or undefined.
     */
    public get(): DeviceGroup | undefined {
        return this.currentGroup;
    }

    /**
     * Resets the currently selected group to nothing.
     */
    public reset(): void {
        this.currentGroup = undefined;
    }
}
