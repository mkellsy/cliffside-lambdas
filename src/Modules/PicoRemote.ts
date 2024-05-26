import { Action, Button, Device } from "@mkellsy/hap-device";

export abstract class PicoRemote {
    public static mapButton(
        button: string,
        device: string,
        long?: (device?: Device) => void,
        double?: (device?: Device) => void,
        single?: (device?: Device) => void
    ) {
        return {
            button,
    
            action(
                _control: Device,
                _button: Button,
                state: Action,
                devices: Map<string, Device>
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
