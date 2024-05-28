import { Lambda } from "../Interfaces/Lambda";
import { LEDControl } from "../Modules/LEDControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";

/**
 * Mapps a group of devices to a series of sunnata keypads. note this can map
 * several ganged keypads to a single set of rais and lower buttons.
 *
 * @param control A reference to the control object for cache.
 * @param keypads A list if keypad device ids.
 * @param groups A list if controllable device ids.
 * @param raise The id of the raise button.
 * @param lower The id of the lower button.
 * @param off (optional) The id of the off button.
 *
 * @returns An array of lambdas to be added to the lambda list.
 */
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
