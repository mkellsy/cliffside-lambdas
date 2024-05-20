import { PicoRemote } from "../Modules/PicoRemote";
import { DimmerControl } from "../Modules/DimmerControl";

export function picoDimmerControl(
    device: string,
    onButton: string,
    offButton: string,
    raiseButton: string,
    lowerButton: string,
    favoriteButton: string
) {
    return [
        PicoRemote.mapButton(onButton, device, DimmerControl.on),
        PicoRemote.mapButton(offButton, device, DimmerControl.off),
        PicoRemote.mapButton(raiseButton, device, DimmerControl.raise),
        PicoRemote.mapButton(lowerButton, device, DimmerControl.lower),
        PicoRemote.mapButton(favoriteButton, device, DimmerControl.favorite)
    ]
}
