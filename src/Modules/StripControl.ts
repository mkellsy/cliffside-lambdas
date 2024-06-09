import { Device } from "@mkellsy/hap-device";
import { Strip } from "@mkellsy/leap-client";

/**
 * Defines the lambda actions for dimmers.
 */
export abstract class StripControl {
    /**
     * Defines the on lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async on(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = "On";
        const level = 100;

        await strip.set({ state, level, luminance: strip.status.luminance });
    }

    /**
     * Defines the off lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async off(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = "Off";
        const level = 0;

        await strip.set({ state, level, luminance: strip.status.luminance });
    }

    /**
     * Defines the toggle lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async toggle(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = strip.status.state === "On" ? "Off" : "On";
        const level = state === "On" ? 100 : 0;

        await strip.set({ state, level, luminance: strip.status.luminance });
    }

    /**
     * Defines the raise lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async raise(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = "On";
        const level = (strip.status.level || 0) + 10;

        if (level <= 100 && level >= 0) {
            await strip.set({ state, level, luminance: strip.status.luminance });
        }
    }

    /**
     * Defines the lower lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async lower(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = "On";
        const level = (strip.status.level || 0) - 10;

        if (level <= 100 && level > 0) {
            await strip.set({ state, level, luminance: strip.status.luminance });
        } else if (level == 0) {
            await strip.set({ state: "Off", level, luminance: strip.status.luminance });
        }
    }

    /**
     * Defines the favorite lambda action, if the strip device is defined.
     *
     * @param cco (optional) A reference if exists to the strip device.
     */
    public static async favorite(strip?: Strip): Promise<void> {
        if (strip == null) {
            return;
        }

        const state = "On";
        const level = 20;

        await strip.set({ state, level, luminance: strip.status.luminance });
    }
}
