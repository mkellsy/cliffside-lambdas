import { PicoRemote } from "../Modules/PicoRemote";
import { FanControl } from "../Modules/FanControl";

export function picoFanControl(
    device: string,
    onButton: string,
    offButton: string,
    raiseButton: string,
    lowerButton: string,
    favoriteButton: string
) {
    return [
        PicoRemote.mapButton(onButton, device, FanControl.on),
        PicoRemote.mapButton(offButton, device, FanControl.off),
        PicoRemote.mapButton(raiseButton, device, FanControl.raise),
        PicoRemote.mapButton(lowerButton, device, FanControl.lower),
        PicoRemote.mapButton(favoriteButton, device, FanControl.auto, FanControl.whoosh, FanControl.favorite)
    ]
}
