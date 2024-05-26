import * as Interfaces from "@mkellsy/hap-device";

import { Action } from "../Interfaces/Action";

export abstract class PicoRemote {
    public static mapButton(
        button: string,
        device: string,
        long?: (device?: Interfaces.Device) => void,
        double?: (device?: Interfaces.Device) => void,
        single?: (device?: Interfaces.Device) => void
    ): Action {
        return {
            button,
    
            action(
                _button: Interfaces.Button,
                state: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) {
                switch (state) {
                    case "Press":
                        if (single != null) {
                            return single(devices.get(device));
                        }
    
                    case "DoublePress":
                        if (double != null) {
                            return double(devices.get(device));
                        }
    
                    case "LongPress":
                        if (long != null) {
                            return long(devices.get(device));
                        }
                }
            },
        };
    }
}
