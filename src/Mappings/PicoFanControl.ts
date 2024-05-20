import { PicoRemote } from "../Modules/PicoRemote";
import { FanControl } from "../Modules/FanControl";

export function picoFanControl(
    device: string,
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string
) {
    return [
        PicoRemote.mapButton(on, device, undefined, undefined, FanControl.on),
        PicoRemote.mapButton(off, device, undefined, undefined, FanControl.off),
        PicoRemote.mapButton(raise, device, undefined, undefined, FanControl.raiseSpeed),
        PicoRemote.mapButton(lower, device, undefined, undefined, FanControl.lowerSpeed),
        PicoRemote.mapButton(favorite, device, FanControl.favoriteSpeed, FanControl.toggleWhoosh, FanControl.auto)
    ]
}
