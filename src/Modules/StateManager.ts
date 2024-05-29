import os from "os";
import path from "path";

import Cache from "flat-cache";

import { DeviceGroup } from "../Interfaces/DeviceGroup";

/**
 * Maintains currently selected devices.
 */
export class StateManager {
    private cache: Cache.Cache;

    constructor(name: string) {
        this.cache = Cache.load(name, path.join(os.homedir(), ".leap"));
    }

    /**
     * Sets a group as currently selected.
     *
     * @param group A device group object to select.
     */
    public set(group: DeviceGroup): void {
        this.cache.setKey("/selected", group);
        this.cache.save(true);
    }

    /**
     * Gets the currently selected group.
     *
     * @returns A device group object or undefined.
     */
    public get(): DeviceGroup | undefined {
        const cached = this.cache.getKey("/selected");

        if (cached == null) {
            return undefined;
        }

        return cached as DeviceGroup;
    }

    /**
     * Determines if the current group is equal to the provided group.
     *
     * @param group The group to test.
     *
     * @returns True if it is equal false if not.
     */
    public is(group: DeviceGroup): boolean {
        const current = this.get();

        return JSON.stringify(group) === JSON.stringify(current);
    }

    /**
     * Resets the currently selected group to nothing.
     */
    public reset(): void {
        this.cache.removeKey("/selected");
        this.cache.removeCacheFile();
        this.cache.save();
    }
}
