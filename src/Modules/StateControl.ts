import { Action, Device } from "@mkellsy/hap-device";
import { ContactControl } from "./ContactControl";
import { FanControl } from "./FanControl";
import { DimmerControl } from "./DimmerControl";
import { SwitchControl } from "../Modules/SwitchControl";

export class StateControl {
    private currentDevice: string = "Unknown";

    public static select(
        button: string,
        device: string,
        state: StateControl,
        controlled: boolean
    ) {
        return {
            button,

            action: (buttonAction: Action, devices: Map<string, Device>) => {
                if (buttonAction !== "Press") {
                    return;
                }

                const control = devices.get(device);

                if (
                    !controlled &&
                    control != null &&
                    control.capabilities.speed != null
                ) {
                    FanControl.toggle(control);
                } else if (
                    !controlled &&
                    control != null &&
                    control.capabilities.level != null
                ) {
                    DimmerControl.toggle(control);
                } else if (
                    !controlled &&
                    control != null &&
                    control.capabilities.state != null &&
                    control.capabilities.state.values != null &&
                    control.capabilities.state.values.indexOf("On") >= 0 &&
                    control.capabilities.state.values.indexOf("Off") >= 0
                ) {
                    SwitchControl.toggle(control);
                } else if (
                    !controlled &&
                    control != null &&
                    control.capabilities.state != null &&
                    control.capabilities.state.values != null &&
                    control.capabilities.state.values.indexOf("Open") >= 0 &&
                    control.capabilities.state.values.indexOf("Closed") >= 0
                ) {
                    ContactControl.toggle(control);
                }

                state.set(device);
            }
        }
    }
    
    public static raise(button: string, state: StateControl) {
        return {
            button,

            action: (buttonAction: Action, devices: Map<string, Device>) => {
                if (buttonAction !== "Press") {
                    return;
                }

                const control = devices.get(state.get());

                if (
                    control != null &&
                    control.capabilities.speed != null
                ) {
                    FanControl.raise(control);
                } else if (
                    control != null &&
                    control.capabilities.level != null
                ) {
                    DimmerControl.raise(control);
                }
            }
        }
    }

    public static lower(button: string, state: StateControl) {
        return {
            button,

            action: (buttonAction: Action, devices: Map<string, Device>) => {
                if (buttonAction !== "Press") {
                    return;
                }

                const control = devices.get(state.get());

                if (
                    control != null &&
                    control.capabilities.speed != null
                ) {
                    FanControl.lower(control);
                } else if (
                    control != null &&
                    control.capabilities.level != null
                ) {
                    DimmerControl.lower(control);
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
