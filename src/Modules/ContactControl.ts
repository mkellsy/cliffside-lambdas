import { Device } from "@mkellsy/hap-device";

export abstract class ContactControl {
    public static on(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = "Closed";

        cco.set({ state });
    }

    public static off(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = "Open";

        cco.set({ state });
    }

    public static toggle(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = cco.status.state === "Closed" ? "Open" : "Closed";

        cco.set({ state });
    }
}
