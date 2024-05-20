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
        StateControl.select(firstButton, deviceOne, state, deviceOne.startsWith("LEAP")),
        StateControl.select(secondButton, deviceTwo, state, deviceTwo.startsWith("LEAP")),
        StateControl.select(thirdButton, deviceThree, state, deviceThree.startsWith("LEAP")),
        StateControl.raise(raiseButton, state),
        StateControl.lower(lowerButton, state)
    ]
}
