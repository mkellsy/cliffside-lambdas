/**
 * Defines a group of devices to assign to a single button.
 */
export interface DeviceGroup {
    /**
     * The button to assign to.
     */
    button: string;

    /**
     * A list of device ids to assign to the button.
     */
    devices: string[];
}
