import { Action } from "../Interfaces/Action";
import { DeviceGroup } from "../Interfaces/DeviceGroup";
import { StateControl } from "../Modules/StateControl";

export function sunnataStateControl(
    state: StateControl,
    keypads: string[],
    groups: DeviceGroup[],
    raise: string,
    lower: string,
    off?: DeviceGroup
): Action[] {
    const actions: Action[] = [];

    for (let i = 0; i < groups.length; i++) {
        actions.push(StateControl.select(keypads, groups[i], state));
    }

    actions.push(StateControl.raise(raise, state));
    actions.push(StateControl.lower(lower, state));

    if (off != null) {
        actions.push(StateControl.off(keypads, off, state));
    }

    return actions;
}
