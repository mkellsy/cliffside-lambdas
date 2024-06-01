import { Button, Device, Keypad } from "@mkellsy/hap-device";

/**
 * Defines the lambda actions for the LEDs on a keypad.
 */
export abstract class KeypadControl {
    /**
     * Defines the on lambda action for a keypad's led.
     *
     * @param keypad A reference to the keypad.
     * @param button A reference to the button address (href).
     */
    public static on(keypad: Device, button: Button): void {
        if (button.led == null) {
            return;
        }

        keypad.set({ led: button.led, state: "On" });
    }

    /**
     * Defines the off lambda action for a keypad's led.
     *
     * @param keypad A reference to the keypad.
     * @param button A reference to the button address (href).
     */
    public static off(keypad: Device, button: Button): void {
        if (button.led == null) {
            return;
        }

        keypad.set({ led: button.led, state: "Off" });
    }

    /**
     * Defines the select lambda action for a keypad's led. This will turn off
     * all LEDs except the selected button.
     *
     * @param keypad A reference to the keypad.
     * @param button A reference to the button address (href).
     */
    public static select(keypad: Device, button: Button): void {
        const buttons = (keypad as Keypad).buttons.filter((item) => item.led != null);

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id === button.id) {
                KeypadControl.on(keypad, buttons[i]);
            } else {
                KeypadControl.off(keypad, buttons[i]);
            }
        }
    }

    /**
     * Defines the reset lambda action for a keypad's led. This will turn off
     * all LEDs on a keypad.
     *
     * @param keypad A reference to the keypad.
     */
    public static reset(keypad: Device): void {
        const buttons = (keypad as Keypad).buttons.filter((item) => item.led != null);

        for (let i = 0; i < buttons.length; i++) {
            KeypadControl.off(keypad, buttons[i]);
        }
    }
}
