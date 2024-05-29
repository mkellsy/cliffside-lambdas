import { DeviceGroup } from "../Interfaces/DeviceGroup";

/**
 * Maintains currently selected devices.
 */
export class StateManager {
    private currentGroup?: DeviceGroup;

    /**
     * Sets a group as currently selected.
     *
     * @param group A device group object to select.
     */
    public set(group: DeviceGroup): void {
        this.currentGroup = group;
    }

    /**
     * Gets the currently selected group.
     *
     * @returns A device group object or undefined.
     */
    public get(): DeviceGroup | undefined {
        return this.currentGroup;
    }

    /**
     * Resets the currently selected group to nothing.
     */
    public reset(): void {
        this.currentGroup = undefined;
    }
}
