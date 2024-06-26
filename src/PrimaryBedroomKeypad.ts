import { StateManager } from "./Modules/StateManager";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const state = new StateManager("EntrywayKeypad");

module.exports = sunnataSelectControl(
    state,
    [
        { button: "LEAP-04E58C0B-BUTTON-23300", devices: ["BAF-123456-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23304", devices: ["BAF-123456-UPLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23308", devices: ["BAF-123456-FAN"] },
        { button: "LEAP-04E58C0B-BUTTON-9149", devices: ["LEAP-04E58C0B-DIMMER-1691", "LEAP-04E58C0B-DIMMER-1729"] },
        { button: "LEAP-04E58C0B-BUTTON-9153", devices: ["LEAP-04E58C0B-DIMMER-2024"] },
    ],
    "LEAP-04E58C0B-BUTTON-23314",
    "LEAP-04E58C0B-BUTTON-23312",
    {
        button: "LEAP-04E58C0B-BUTTON-14368",
        devices: ["BAF-123456-DOWNLIGHT", "BAF-123456-UPLIGHT", "BAF-123456-FAN"],
    },
);
