import * as Interfaces from "@mkellsy/hap-device";

import { Action } from "../Interfaces/Action";
import { ContactControl } from "./ContactControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { DimmerControl } from "./DimmerControl";
import { FanControl } from "./FanControl";
import { KeypadControl } from "./KeypadControl";
import { SwitchControl } from "../Modules/SwitchControl";

export class StateControl {
    private currentGroup?: DeviceGroup;

    public static select(
        keypads: string[],
        group: DeviceGroup,
        store: StateControl,
    ): Action {
        return {
            button: group.button,

            action: (
                button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                if (state !== "Press") {
                    return;
                }

                for (let i = 0; i < keypads.length; i++) {
                    const target = devices.get(keypads[i]);
        
                    if (target == null || target.type !== Interfaces.DeviceType.Keypad) {
                        continue;
                    }
        
                    KeypadControl.select(target, button);
                }

                if (store.get() === group) {
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

                store.set(group);
            }
        };
    }

    public static off(
        keypads: string[],
        group: DeviceGroup,
        store: StateControl
    ): Action {
        return {
            button: group.button,

            action: (
                button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                if (state !== "Press") {
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

                store.reset();
            }
        };
    }
    
    public static raise(button: string, store: StateControl): Action {
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

    public static lower(button: string, store: StateControl): Action {
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
