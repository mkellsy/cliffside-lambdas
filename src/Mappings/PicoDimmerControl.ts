import { Lambda } from "../Interfaces/Lambda";
import { PicoRemote } from "../Modules/PicoRemote";
import { DimmerControl } from "../Modules/DimmerControl";

/**
 * Maps a pico remote to a group of dimmers.
 *
 * @param group List of controllable device ids.
 * @param on The id of the on button.
 * @param off The id of the off button.
 * @param raise The id of the raise button.
 * @param lower The id of the lower button.
 * @param favorite The id of the favorite button.
 *
 * @returns An array of lambdas to be added to the lambda list.
 */
export function picoDimmerControl(
    group: string[],
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string
): Lambda[] {
    return [
        PicoRemote.mapButton(on, group, DimmerControl.on),
        PicoRemote.mapButton(off, group, DimmerControl.off),
        PicoRemote.mapButton(raise, group, DimmerControl.raise),
        PicoRemote.mapButton(lower, group, DimmerControl.lower),
        PicoRemote.mapButton(favorite, group, DimmerControl.favorite)
    ]
}
