import { Device } from "@mkellsy/hap-device";

/**
 * Devices lambdas for contact devices (CCO).
 */
export abstract class ContactControl {
    /**
     * Defines the on lambda action, if the cco device is defined.
     *
     * @param cco (optional) A reference if exists to the CCO device.
     */
    public static on(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = "Closed";

        cco.set({ state });
    }

    /**
     * Defines the off lambda action, if the cco device is defined.
     *
     * @param cco (optional) A reference if exists to the CCO device.
     */
    public static off(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = "Open";

        cco.set({ state });
    }

    /**
     * Defines the toggle lambda action, if the cco device is defined.
     *
     * @param cco (optional) A reference if exists to the CCO device.
     */
    public static toggle(cco?: Device): void {
        if (cco == null) {
            return;
        }

        const state = cco.status.state === "Closed" ? "Open" : "Closed";

        cco.set({ state });
    }
}
