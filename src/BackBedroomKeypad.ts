import { StateManager } from "./Modules/StateManager";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const state = new StateManager("EntrywayKeypad");

module.exports = sunnataSelectControl(
    state,
    [
        { button: "LEAP-04E58C0B-BUTTON-23386", devices: ["BAF-123456-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23390", devices: [] },
        { button: "LEAP-04E58C0B-BUTTON-23394", devices: ["BAF-123456-FAN"] },
    ],
    "LEAP-04E58C0B-BUTTON-23400",
    "LEAP-04E58C0B-BUTTON-23398",
);
