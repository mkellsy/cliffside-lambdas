import * as Interfaces from "@mkellsy/hap-device";

import { ContactControl } from "./ContactControl";
import { FanControl } from "./FanControl";
import { DimmerControl } from "./DimmerControl";
import { SwitchControl } from "../Modules/SwitchControl";

export class StateControl {
    private currentDevice: string = "Unknown";

    public static select(
        button: string,
        device: string,
        store: StateControl,
    ) {
        return {
            button,

            action: (
                control: Interfaces.Device,
                button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                if (state !== "Press") {
                    return;
                }

                const target = devices.get(device);

                if (target != null && store.get() === device) {
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

                if (control.type === Interfaces.DeviceType.Keypad) {
                    const keypad = control as Interfaces.Keypad;
                    const buttons = keypad.buttons.filter((item) => item.led != null);

                    for (let i = 0; i < buttons.length; i++) {
                        control.set({
                            led: buttons[i].led,
                            state: buttons[i].id === button.id ? "On" : "Off",
                        });
                    }
                }

                store.set(device);
            }
        }
    }
    
    public static raise(button: string, store: StateControl) {
        return {
            button,

            action: (
                _control: Interfaces.Device,
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                if (state !== "Press") {
                    return;
                }

                const target = devices.get(store.get());

                if (
                    target != null &&
                    target.capabilities.speed != null
                ) {
                    FanControl.raise(target);
                } else if (
                    target != null &&
                    target.capabilities.level != null
                ) {
                    DimmerControl.raise(target);
                }
            }
        }
    }

    public static lower(button: string, store: StateControl) {
        return {
            button,

            action: (
                _control: Interfaces.Device,
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) => {
                if (state !== "Press") {
                    return;
                }

                const target = devices.get(store.get());

                if (
                    target != null &&
                    target.capabilities.speed != null
                ) {
                    FanControl.lower(target);
                } else if (
                    target != null &&
                    target.capabilities.level != null
                ) {
                    DimmerControl.lower(target);
                }
            }
        }
    }

    public set(device: string) {
        this.currentDevice = device;
    }

    public get(): string {
        return this.currentDevice;
    }
}
