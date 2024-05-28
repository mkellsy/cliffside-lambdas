import * as Interfaces from "@mkellsy/hap-device";

import { Lambda } from "../Interfaces/Lambda";

export abstract class PicoRemote {
    public static mapButton(
        button: string,
        group: string[],
        long?: (device?: Interfaces.Device) => void,
        double?: (device?: Interfaces.Device) => void,
        single?: (device?: Interfaces.Device) => void
    ): Lambda {
        return {
            button,
    
            action(
                _button: Interfaces.Button,
                action: Interfaces.Action,
                devices: Map<string, Interfaces.Device>
            ) {
                switch (action) {
                    case "Press":
                        if (single != null) {
                            for (let i = 0; i < group.length; i++) {
                                single(devices.get(group[i]));
                            }

                            return
                        }
    
                    case "DoublePress":
                        if (double != null) {
                            for (let i = 0; i < group.length; i++) {
                                double(devices.get(group[i]));
                            }

                            return;
                        }
    
                    case "LongPress":
                        if (long != null) {
                            for (let i = 0; i < group.length; i++) {
                                long(devices.get(group[i]));
                            }

                            return;
                        }
                }
            },
        };
    }
}
