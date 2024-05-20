import { Device } from "@mkellsy/hap-device";

export abstract class DimmerControl {
    public static on(dimmer?: Device) {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = 100;

        dimmer.set({ state, level });
    }

    public static off(dimmer?: Device) {
        if (dimmer == null) {
            return;
        }

        const state = "Off";
        const level = 0;

        dimmer.set({ state, level });
    }

    public static toggle(dimmer?: Device) {
        if (dimmer == null) {
            return;
        }

        const state = dimmer.status.state === "On" ? "Off" : "On";
        const level = state === "On" ? 100 : 0;

        dimmer.set({ state, level });
    }

    public static raise(dimmer?: Device) {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = (dimmer.status.level || 0) + 10;

        if (level <= 100 && level >= 0) {
            dimmer.set({ state, level });
        }
    }

    public static lower(dimmer?: Device) {
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

    public static favorite(dimmer?: Device) {
        if (dimmer == null) {
            return;
        }

        const state = "On";
        const level = 50;

        dimmer.set({ state, level });
    }
}
