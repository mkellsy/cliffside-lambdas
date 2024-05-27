import * as Interfaces from "@mkellsy/hap-device";

import { Action } from "../Interfaces/Action";
import { ContactControl } from "./ContactControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { SwitchControl } from "./SwitchControl";

export class SelectControl {
    private currentGroup?: DeviceGroup;

    public static select(group: DeviceGroup, store: SelectControl): Action {
        return {
            button: group.button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action
            ) => {
                if (state !== "Press") {
                    return;
                }

                store.set(group);
            }
        };
    }

    public static on(button: string, store: SelectControl): Action {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = store.get();

                if (group == null || state !== "Press") {
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

    public static off(button: string, store: SelectControl): Action {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = store.get();

                if (group == null || state !== "Press") {
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
    
    public static raise(button: string, store: SelectControl): Action {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = store.get();

                if (group == null || state !== "Press") {
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

    public static lower(button: string, store: SelectControl): Action {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = store.get();

                if (group == null || state !== "Press") {
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

    public static favorite(button: string, store: SelectControl): Action {
        return {
            button,

            action: (
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                const group = store.get();

                if (group == null || state !== "Press") {
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

    public set(group: DeviceGroup): void {
        this.currentGroup = group;
    }

    public get(): DeviceGroup | undefined {
        return this.currentGroup;
    }

    public reset(): void {
        this.currentGroup = undefined;
    }
}
