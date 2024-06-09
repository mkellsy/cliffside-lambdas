import { Action, Button, Device } from "@mkellsy/hap-device";

import { Lambda } from "../Interfaces/Lambda";

/**
 * Defines lambdas for pico remotes.
 */
export abstract class PicoRemote {
    /**
     * Maps a pico button to a set of functions for each action. This will
     * waterfall the callbacks. If only the long is defined, both double and
     * single will perform the same action. If long and double are defined,
     * single and double will invoke the double callback, and if all three are
     * defined, each callback will be invoked via the respective action.
     *
     * @param button The id of the button.
     * @param group The group of device ids to assign to this button.
     * @param long The function to perform on long press, or waterfalled from single.
     * @param double The function to perform on double press, or waterfalled from single.
     * @param single The function to perform on single press.
     *
     * @returns A lambda to add to the lambda list.
     */
    public static mapButton<DEVICE extends Device>(
        button: string,
        group: string[],
        long?: (device?: DEVICE) => PromiseLike<void>,
        double?: (device?: DEVICE) => PromiseLike<void>,
        single?: (device?: DEVICE) => PromiseLike<void>,
    ): Lambda {
        return {
            button,

            async action(_button: Button, action: Action, devices: Map<string, Device>): Promise<void> {
                switch (action) {
                    case "Press":
                        if (single != null) {
                            for (let i = 0; i < group.length; i++) {
                                await single(devices.get(group[i]) as DEVICE);
                            }

                            return;
                        }

                    case "DoublePress":
                        if (double != null) {
                            for (let i = 0; i < group.length; i++) {
                                await double(devices.get(group[i]) as DEVICE);
                            }

                            return;
                        }

                    case "LongPress":
                        if (long != null) {
                            for (let i = 0; i < group.length; i++) {
                                await long(devices.get(group[i]) as DEVICE);
                            }

                            return;
                        }
                }
            },
        };
    }
}
