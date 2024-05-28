import { ButtonControl } from "../Modules/ButtonControl";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { Lambda } from "../Interfaces/Lambda";

export function picoSelectControl(
    control: ButtonControl,
    groups: DeviceGroup[],
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string,
): Lambda[] {
    const lambdas: Lambda[] = [];

    for (let i = 0; i < groups.length; i++) {
        lambdas.push(ButtonControl.select(groups[i], control));
    }

    lambdas.push(ButtonControl.on(on, control));
    lambdas.push(ButtonControl.off(off, control));
    lambdas.push(ButtonControl.raise(raise, control));
    lambdas.push(ButtonControl.lower(lower, control));
    lambdas.push(ButtonControl.favorite(favorite, control));

    return lambdas;
}
