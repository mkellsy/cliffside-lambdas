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
    public static async on(keypad: Device, button: Button): Promise<void> {
        if (button.led == null) {
            return;
        }

        await keypad.set({ led: button.led, state: "On" });
    }

    /**
     * Defines the off lambda action for a keypad's led.
     *
     * @param keypad A reference to the keypad.
     * @param button A reference to the button address (href).
     */
    public static async off(keypad: Device, button: Button): Promise<void> {
        if (button.led == null) {
            return;
        }

        await keypad.set({ led: button.led, state: "Off" });
    }

    /**
     * Defines the select lambda action for a keypad's led. This will turn off
     * all LEDs except the selected button.
     *
     * @param keypad A reference to the keypad.
     * @param button A reference to the button address (href).
     */
    public static async select(keypad: Device, button: Button): Promise<void> {
        const buttons = (keypad as Keypad).buttons.filter((item) => item.led != null);

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id === button.id) {
                await KeypadControl.on(keypad, buttons[i]);
            } else {
                await KeypadControl.off(keypad, buttons[i]);
            }
        }
    }

    /**
     * Defines the reset lambda action for a keypad's led. This will turn off
     * all LEDs on a keypad.
     *
     * @param keypad A reference to the keypad.
     */
    public static async reset(keypad: Device): Promise<void> {
        const buttons = (keypad as Keypad).buttons.filter((item) => item.led != null);

        for (let i = 0; i < buttons.length; i++) {
            await KeypadControl.off(keypad, buttons[i]);
        }
    }
}
