import { ButtonControl } from "../Modules/ButtonControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { Lambda } from "../Interfaces/Lambda";
import { StateManager } from "../Modules/StateManager";

/**
 * Mapps a group of devices to a series of pico remotes.
 *
 * @param control A reference to the control object for cache.
 * @param groups A list if controllable device ids.
 * @param on The id of the on button.
 * @param off The id of the off button.
 * @param raise The id of the raise button.
 * @param lower The id of the lower button.
 * @param favorite The id of the favorite button.
 *
 * @returns An array of lambdas to be added to the lambda list.
 */
export function picoSelectControl(
    state: StateManager,
    groups: DeviceGroup[],
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string,
): Lambda[] {
    const lambdas: Lambda[] = [];

    for (let i = 0; i < groups.length; i++) {
        lambdas.push(ButtonControl.select(groups[i], state));
    }

    lambdas.push(ButtonControl.on(on, state));
    lambdas.push(ButtonControl.off(off, state));
    lambdas.push(ButtonControl.raise(raise, state));
    lambdas.push(ButtonControl.lower(lower, state));
    lambdas.push(ButtonControl.favorite(favorite, state));

    return lambdas;
}
