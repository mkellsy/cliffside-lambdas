import { Device } from "@mkellsy/hap-device";

export abstract class SwitchControl {
    public static on(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = "On";

        binary.set({ state });
    }

    public static off(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = "Off";

        binary.set({ state });
    }

    public static toggle(binary?: Device): void {
        if (binary == null) {
            return;
        }

        const state = binary.status.state === "On" ? "Off" : "On";

        binary.set({ state });
    }
}
