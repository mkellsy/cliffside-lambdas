import { Lambda } from "../Interfaces/Lambda";
import { PicoRemote } from "../Modules/PicoRemote";
import { FanControl } from "../Modules/FanControl";

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
