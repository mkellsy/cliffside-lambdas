import { Device } from "@mkellsy/hap-device";

/**
 * Defines lamda actions for switch devices.
 */
export abstract class SwitchControl {
    /**
     * Defines the lambda on action if the switch is defined.
     *
     * @param binary (optional) A reference to the switch, if defined.
     */
    public static on(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = "On";

        binary.set({ state });
    }

    /**
     * Defines the lambda off action if the switch is defined.
     *
     * @param binary (optional) A reference to the switch, if defined.
     */
    public static off(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = "Off";

        binary.set({ state });
    }

    /**
     * Defines the lambda otoggle action if the switch is defined.
     *
     * @param binary (optional) A reference to the switch, if defined.
     */
    public static toggle(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = binary.status.state === "On" ? "Off" : "On";

        binary.set({ state });
    }
}
