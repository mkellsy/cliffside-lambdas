import * as Interfaces from "@mkellsy/hap-device";

import { Fan } from "@mkellsy/baf-client";
import { Dimmer, Strip, Switch } from "@mkellsy/leap-client";

import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { Lambda } from "../Interfaces/Lambda";
import { StateManager } from "./StateManager";
import { StripControl } from "./StripControl";
import { SwitchControl } from "./SwitchControl";

/**
 * Defines how multiple pico buttons interact with a control pico.
 */
export class ButtonControl {
    /**
     * Selects a device to be controled.
     *
     * @param group A mapped device group.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static select(group: DeviceGroup, state: StateManager): Lambda {
        return {
            button: group.button,

            action: async (_button: Interfaces.Button, action: Interfaces.Action): Promise<void> => {
                if (action === "Release") {
                    return;
                }

                state.set(group);
            },
        };
    }

    /**
     * Creates the on lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static on(button: string, state: StateManager): Lambda {
        return {
            button,

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
                const group = state.get();

                if (group == null || action === "Release") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target != null) {
                        if (target.capabilities.speed != null) {
                            await FanControl.on(target as Fan);
                        } else if (target.capabilities.luminance != null) {
                            await StripControl.on(target as Strip);
                        } else if (target.capabilities.level != null) {
                            await DimmerControl.on(target as Dimmer);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            await SwitchControl.on(target as Switch);
                        }
                    }
                }
            },
        };
    }

    /**
     * Creates the off lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static off(button: string, state: StateManager): Lambda {
        return {
            button,

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
                const group = state.get();

                if (group == null || action === "Release") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target != null) {
                        if (target.capabilities.speed != null) {
                            await FanControl.off(target as Fan);
                        } else if (target.capabilities.luminance != null) {
                            await StripControl.off(target as Strip);
                        } else if (target.capabilities.level != null) {
                            await DimmerControl.off(target as Dimmer);
                        } else if (
                            target.capabilities.state != null &&
                            target.capabilities.state.values != null &&
                            target.capabilities.state.values.indexOf("On") >= 0 &&
                            target.capabilities.state.values.indexOf("Off") >= 0
                        ) {
                            await SwitchControl.off(target as Switch);
                        }
                    }
                }
            },
        };
    }

    /**
     * Creates the raise lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
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

                if (group == null || action === "Release") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        await FanControl.raise(target as Fan);
                    } else if (target.capabilities.luminance != null) {
                        await StripControl.raise(target as Strip);
                    } else if (target.capabilities.level != null) {
                        await DimmerControl.raise(target as Dimmer);
                    }
                }
            },
        };
    }

    /**
     * Creates the lower lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
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

                if (group == null || action === "Release") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        await FanControl.lower(target as Fan);
                    } else if (target.capabilities.luminance != null) {
                        await StripControl.lower(target as Strip);
                    } else if (target.capabilities.level != null) {
                        await DimmerControl.lower(target as Dimmer);
                    }
                }
            },
        };
    }

    /**
     * Creates the favorite lambda for the control pico.
     *
     * @param button The id of the on button.
     * @param state A reference to this state object for cache.
     *
     * @returns A lambda to be added to the lambda list.
     */
    public static favorite(button: string, state: StateManager): Lambda {
        return {
            button,

            action: async (
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>,
            ): Promise<void> => {
                const group = state.get();

                if (group == null || action === "Release") {
                    return;
                }

                for (let i = 0; i < group.devices.length; i++) {
                    const target = devices.get(group.devices[i]);

                    if (target == null) {
                        continue;
                    }

                    if (target.capabilities.speed != null) {
                        await FanControl.favorite(target as Fan);
                    } else if (target.capabilities.luminance != null) {
                        await StripControl.favorite(target as Strip);
                    } else if (target.capabilities.level != null) {
                        await DimmerControl.favorite(target as Dimmer);
                    }
                }
            },
        };
    }
}
