import { StateManager } from "./Modules/StateManager";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const state = new StateManager("EntrywayKeypad");

module.exports = sunnataSelectControl(
    state,
    ["LEAP-04E58C0B-KEYPAD-23377"],
    [
        { button: "LEAP-04E58C0B-BUTTON-23386", devices: ["BAF-123456-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23390", devices: ["LEAP-04E58C0B-DIMMER-2058"] },
        { button: "LEAP-04E58C0B-BUTTON-23394", devices: ["BAF-123456-FAN"] },
    ],
    "LEAP-04E58C0B-BUTTON-23400",
    "LEAP-04E58C0B-BUTTON-23398",
);