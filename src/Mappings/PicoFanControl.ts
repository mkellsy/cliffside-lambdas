import { Lambda } from "../Interfaces/Lambda";
import { PicoRemote } from "../Modules/PicoRemote";
import { FanControl } from "../Modules/FanControl";

/**
 * Maps a pico remote to a group of fans.
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
export function picoFanControl(
    group: string[],
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string
): Lambda[] {
    return [
        PicoRemote.mapButton(on, group, FanControl.on),
        PicoRemote.mapButton(off, group, FanControl.off),
        PicoRemote.mapButton(raise, group, FanControl.raise),
        PicoRemote.mapButton(lower, group, FanControl.lower),
        PicoRemote.mapButton(favorite, group, FanControl.auto, FanControl.whoosh, FanControl.favorite)
    ]
}
