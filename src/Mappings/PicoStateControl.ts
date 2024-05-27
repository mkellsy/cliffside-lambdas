import { Action } from "../Interfaces/Action";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { SelectControl } from "../Modules/SelectControl";

export function picoStateControl(
    state: SelectControl,
    groups: DeviceGroup[],
    on: string,
    off: string,
    raise: string,
    lower: string,
    favorite: string,
): Action[] {
    const actions: Action[] = [];

    for (let i = 0; i < groups.length; i++) {
        actions.push(SelectControl.select(groups[i], state));
    }

    actions.push(SelectControl.raise(on, state));
    actions.push(SelectControl.raise(off, state));
    actions.push(SelectControl.raise(raise, state));
    actions.push(SelectControl.lower(lower, state));
    actions.push(SelectControl.raise(favorite, state));

    return actions;
}
