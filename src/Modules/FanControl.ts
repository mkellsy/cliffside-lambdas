import { Device } from "@mkellsy/hap-device";

export abstract class FanControl {
    public static on(fan?: Device) {
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

    public static off(fan?: Device) {
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

    public static auto(fan?: Device) {
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

    public static raiseSpeed(fan?: Device) {
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

    public static lowerSpeed(fan?: Device) {
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

    public static favoriteSpeed(fan?: Device) {
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

    public static toggleWhoosh(fan?: Device) {
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