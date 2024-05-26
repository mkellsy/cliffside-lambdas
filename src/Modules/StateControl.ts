import { Action, Device } from "@mkellsy/hap-device";
import { ContactControl } from "./ContactControl";
import { FanControl } from "./FanControl";
import { DimmerControl } from "./DimmerControl";
import { SwitchControl } from "../Modules/SwitchControl";

export class StateControl {
    private currentDevice: string = "Unknown";
    private currentActivate: () => void = () => { /* no-op */ };

    private activityTimeout?: NodeJS.Timeout;

    public static select(
        button: string,
        device: string,
        state: StateControl,
    ) {
        return {
            button,

            action: (buttonAction: Action, devices: Map<string, Device>, activate: () => void) => {
                if (buttonAction !== "Press") {
                    return;
                }

                const control = devices.get(device);

                if (control != null && state.get() === device) {
                    if (control.capabilities.speed != null) {
                        FanControl.toggle(control);
                    } else if (control.capabilities.level != null) {
                        DimmerControl.toggle(control);
                    } else if (
                        control.capabilities.state != null &&
                        control.capabilities.state.values != null &&
                        control.capabilities.state.values.indexOf("On") >= 0 &&
                        control.capabilities.state.values.indexOf("Off") >= 0
                    ) {
                        SwitchControl.toggle(control);
                    } else if (
                        control.capabilities.state != null &&
                        control.capabilities.state.values != null &&
                        control.capabilities.state.values.indexOf("Open") >= 0 &&
                        control.capabilities.state.values.indexOf("Closed") >= 0
                    ) {
                        ContactControl.toggle(control);
                    }
                }

                state.set(device, activate);
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

                state.activate();

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

                state.activate();

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

    public reset(): void {
        this.currentDevice = "Unknown";
        this.currentActivate = () => { /* no-op */ };
    }

    public set(device: string, activate: () => void) {
        this.currentDevice = device;
        this.currentActivate = activate;

        this.activate();
    }

    public get(): string {
        return this.currentDevice;
    }

    public activate(): void {
        if (this.activityTimeout != null) {
            clearTimeout(this.activityTimeout);

            this.activityTimeout = undefined
        }

        this.currentActivate();

        this.activityTimeout = setTimeout(this.reset, 120_000);
    }
}
