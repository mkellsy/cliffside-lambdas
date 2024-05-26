import { Action } from "../Interfaces/Action";
import { PicoRemote } from "../Modules/PicoRemote";
import { FanControl } from "../Modules/FanControl";

export function picoFanControl(
    device: string,
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string
): Action[] {
    return [
        PicoRemote.mapButton(on, device, FanControl.on),
        PicoRemote.mapButton(off, device, FanControl.off),
        PicoRemote.mapButton(raise, device, FanControl.raise),
        PicoRemote.mapButton(lower, device, FanControl.lower),
        PicoRemote.mapButton(favorite, device, FanControl.auto, FanControl.whoosh, FanControl.favorite)
    ]
}
