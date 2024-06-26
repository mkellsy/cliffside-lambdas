import { Device } from "@mkellsy/hap-device";
import { Fan } from "@mkellsy/baf-client";

/**
 * Defines the lambda actions for fans.
 */
export abstract class FanControl {
    /**
     * Defines the on lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async on(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = 7;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }

    /**
     * Defines the off lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async off(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "Off";
        const speed = 0;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }

    /**
     * Defines the toggle lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async toggle(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = fan.status.state === "On" ? "Off" : "On";
        const speed = state === "On" ? 7 : 0;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }

    /**
     * Defines the auto lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async auto(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "Auto";
        const speed = fan.status.speed || 0;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }

    /**
     * Defines the raise lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async raise(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = (fan.status.speed || 0) + 1;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        if (speed <= 7 && speed >= 0) {
            await fan.set({ state, speed, whoosh, eco });
        }
    }

    /**
     * Defines the lower lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async lower(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = (fan.status.speed || 0) - 1;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        if (speed <= 7 && speed > 0) {
            await fan.set({ state, speed, whoosh, eco });
        } else if (speed == 0) {
            await fan.set({ state: "Off", speed, whoosh, eco });
        }
    }

    /**
     * Defines the favorite lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async favorite(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = 4;
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }

    /**
     * Defines the whoosh lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static async whoosh(fan?: Fan): Promise<void> {
        if (fan == null) {
            return;
        }

        const state = fan.status.state;
        const speed = fan.status.speed || 0;
        const whoosh = (fan.status.whoosh || "Off") === "Off" ? "On" : "Off";
        const eco = fan.status.eco || "Off";

        await fan.set({ state, speed, whoosh, eco });
    }
}
