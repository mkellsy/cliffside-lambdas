import { Action } from "../Interfaces/Action";
import { PicoRemote } from "../Modules/PicoRemote";
import { DimmerControl } from "../Modules/DimmerControl";

export function picoDimmerControl(
    device: string,
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string
): Action[] {
    return [
        PicoRemote.mapButton(on, device, DimmerControl.on),
        PicoRemote.mapButton(off, device, DimmerControl.off),
        PicoRemote.mapButton(raise, device, DimmerControl.raise),
        PicoRemote.mapButton(lower, device, DimmerControl.lower),
        PicoRemote.mapButton(favorite, device, DimmerControl.favorite)
    ]
}
