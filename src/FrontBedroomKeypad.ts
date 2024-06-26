import { StateManager } from "./Modules/StateManager";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const state = new StateManager("EntrywayKeypad");

module.exports = sunnataSelectControl(
    state,
    [
        { button: "LEAP-04E58C0B-BUTTON-23348", devices: ["BAF-123456-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23352", devices: [] },
        { button: "LEAP-04E58C0B-BUTTON-23356", devices: ["BAF-123456-FAN"] },
    ],
    "LEAP-04E58C0B-BUTTON-23362",
    "LEAP-04E58C0B-BUTTON-23360",
);
