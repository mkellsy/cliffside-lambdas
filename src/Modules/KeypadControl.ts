import { Button, Device, Keypad } from "@mkellsy/hap-device";

export abstract class KeypadControl {
    public static on(keypad: Device, button: Button): void {
        if (button.led == null) {
            return;
        }

        keypad.set({ led: button.led, state: "On" });
    }

    public static off(keypad: Device, button: Button): void {
        if (button.led == null) {
            return;
        }

        keypad.set({ led: button.led, state: "Off" });
    }

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

    public static reset(keypad: Device): void {
        const buttons = (keypad as Keypad).buttons.filter((item) => item.led != null);

        for (let i = 0; i < buttons.length; i++) {
            KeypadControl.off(keypad, buttons[i]);
        }
    }
}
