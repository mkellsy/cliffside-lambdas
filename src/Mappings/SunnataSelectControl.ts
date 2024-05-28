import { Lambda } from "../Interfaces/Lambda";
import { LEDControl } from "../Modules/LEDControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";

export function sunnataSelectControl(
    control: LEDControl,
    keypads: string[],
    groups: DeviceGroup[],
    raise: string,
    lower: string,
    off?: DeviceGroup
): Lambda[] {
    const lambdas: Lambda[] = [];

    for (let i = 0; i < groups.length; i++) {
        lambdas.push(LEDControl.select(keypads, groups[i], control));
    }

    lambdas.push(LEDControl.raise(raise, control));
    lambdas.push(LEDControl.lower(lower, control));

    if (off != null) {
        lambdas.push(LEDControl.off(keypads, off, control));
    }

    return lambdas;
}
