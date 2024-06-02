import * as Interfaces from "@mkellsy/hap-device";

/**
 * Defines a lambda object.
 */
export interface Lambda {
    /**
     * The button to assign the lambda to.
     */
    button: string;

    /**
     * The action to perform when the button is pressed.
     *
     * @param button The button that was pressed.
     * @param action The button action, press, double press or long press.
     * @param devices A list of loaded controllable devices.
     */
    action(button: Interfaces.Button, action: Interfaces.Action, devices: Map<string, Interfaces.Device>): PromiseLike<void>;
}
