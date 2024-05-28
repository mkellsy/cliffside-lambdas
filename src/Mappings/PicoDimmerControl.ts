import { Lambda } from "../Interfaces/Lambda";
import { PicoRemote } from "../Modules/PicoRemote";
import { DimmerControl } from "../Modules/DimmerControl";

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
