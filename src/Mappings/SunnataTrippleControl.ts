import { StateControl } from "../Modules/StateControl";

export function SunnataTrippleControl(
    state: StateControl,
    deviceOne: string,
    deviceTwo: string,
    deviceThree: string,
    firstButton: string,
    secondButton: string,
    thirdButton: string,
    raiseButton: string,
    lowerButton: string
) {
    return [
        StateControl.select(firstButton, deviceOne, state),
        StateControl.select(secondButton, deviceTwo, state),
        StateControl.select(thirdButton, deviceThree, state),
        StateControl.raise(raiseButton, state),
        StateControl.lower(lowerButton, state)
    ]
}
