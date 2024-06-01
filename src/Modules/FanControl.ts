import { Device } from "@mkellsy/hap-device";

/**
 * Defines the lambda actions for fans.
 */
export abstract class FanControl {
    /**
     * Defines the on lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static on(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = 7;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }

    /**
     * Defines the off lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static off(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = "Off";
        const speed = 0;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }

    /**
     * Defines the toggle lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static toggle(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = fan.status.state === "On" ? "Off" : "On";
        const speed = state === "On" ? 7 : 0;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }

    /**
     * Defines the auto lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static auto(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = fan.status.state;
        const speed = fan.status.speed || 0;
        const auto = "On";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }

    /**
     * Defines the raise lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static raise(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = (fan.status.speed || 0) + 1;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        if (speed <= 7 && speed >= 0) {
            fan.set({ state, speed, auto, whoosh, eco });
        }
    }

    /**
     * Defines the lower lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static lower(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = (fan.status.speed || 0) - 1;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        if (speed <= 7 && speed > 0) {
            fan.set({ state, speed, auto, whoosh, eco });
        } else if (speed == 0) {
            fan.set({ state: "Off", speed, auto, whoosh, eco });
        }
    }

    /**
     * Defines the favorite lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static favorite(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = "On";
        const speed = 4;
        const auto = "Off";
        const whoosh = fan.status.whoosh || "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }

    /**
     * Defines the whoosh lambda action, if the fan device is defined.
     *
     * @param cco (optional) A reference if exists to the fan device.
     */
    public static whoosh(fan?: Device): void {
        if (fan == null) {
            return;
        }

        const state = fan.status.state;
        const speed = fan.status.speed || 0;
        const auto = "Off";
        const whoosh = (fan.status.whoosh || "Off") === "Off" ? "On" : "Off";
        const eco = fan.status.eco || "Off";

        fan.set({ state, speed, auto, whoosh, eco });
    }
}
