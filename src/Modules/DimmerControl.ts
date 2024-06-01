import { Device } from "@mkellsy/hap-device";

/**
 * Defines the lambda actions for dimmers.
 */
export abstract class DimmerControl {
    /**
     * Defines the on lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static on(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = 100;

        dimmer.set({ state, level });
    }

    /**
     * Defines the off lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static off(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = "Off";
        const level = 0;

        dimmer.set({ state, level });
    }

    /**
     * Defines the toggle lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static toggle(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = dimmer.status.state === "On" ? "Off" : "On";
        const level = state === "On" ? 100 : 0;

        dimmer.set({ state, level });
    }

    /**
     * Defines the raise lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static raise(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = (dimmer.status.level || 0) + 10;

        if (level <= 100 && level >= 0) {
            dimmer.set({ state, level });
        }
    }

    /**
     * Defines the lower lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static lower(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = (dimmer.status.level || 0) - 10;

        if (level <= 100 && level > 0) {
            dimmer.set({ state, level });
        } else if (level == 0) {
            dimmer.set({ state: "Off", level });
        }
    }

    /**
     * Defines the favorite lambda action, if the dimmer device is defined.
     *
     * @param cco (optional) A reference if exists to the dimmer device.
     */
    public static favorite(dimmer?: Device): void {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = 50;

        dimmer.set({ state, level });
    }
}
