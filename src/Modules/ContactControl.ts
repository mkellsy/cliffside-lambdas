import { Device } from "@mkellsy/hap-device";

export abstract class ContactControl {
    public static on(cco?: Device) {
        if (cco == null) {
            return;
        }

        const state = "Closed";

        cco.set({ state });
    }

    public static off(cco?: Device) {
        if (cco == null) {
            return;
        }

        const state = "Open";

        cco.set({ state });
    }

    public static toggle(cco?: Device) {
        if (cco == null) {
            return;
        }

        const state = cco.status.state === "Closed" ? "Open" : "Closed";

        cco.set({ state });
    }
}
