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
    public static async on(cco?: Device): Promise<void> {
        if (cco == null) {
            return;
        }

        const state = "Closed";

        await cco.set({ state });
    }

    /**
     * Defines the off lambda action, if the cco device is defined.
     *
     * @param cco (optional) A reference if exists to the CCO device.
     */
    public static async off(cco?: Device): Promise<void> {
        if (cco == null) {
            return;
        }

        const state = "Open";

        await cco.set({ state });
    }

    /**
     * Defines the toggle lambda action, if the cco device is defined.
     *
     * @param cco (optional) A reference if exists to the CCO device.
     */
    public static async toggle(cco?: Device): Promise<void> {
        if (cco == null) {
            return;
        }

        const state = cco.status.state === "Closed" ? "Open" : "Closed";

        await cco.set({ state });
    }
}
