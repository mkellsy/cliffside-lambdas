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
    public static async on(binary?: Device): Promise<void> {
        if (binary == null) {
            return;
        }

        const state = "On";

        await binary.set({ state });
    }

    /**
     * Defines the lambda off action if the switch is defined.
     *
     * @param binary (optional) A reference to the switch, if defined.
     */
    public static async off(binary?: Device): Promise<void> {
        if (binary == null) {
            return;
        }

        const state = "Off";

        await binary.set({ state });
    }

    /**
     * Defines the lambda otoggle action if the switch is defined.
     *
     * @param binary (optional) A reference to the switch, if defined.
     */
    public static async toggle(binary?: Device): Promise<void> {
        if (binary == null) {
            return;
        }

        const state = binary.status.state === "On" ? "Off" : "On";

        await binary.set({ state });
    }
}
