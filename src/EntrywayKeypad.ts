import { StateControl } from "./Modules/StateControl";
import { sunnataStateControl } from "./Mappings/SunnataStateControl";

const state = new StateControl();

module.exports = sunnataStateControl(
    state,
    ["LEAP-04E58C0B-KEYPAD-6900"],
    [
        { button: "LEAP-04E58C0B-BUTTON-6911", devices: ["LEAP-04E58C0B-DIMMER-6934"]},
        { button: "LEAP-04E58C0B-BUTTON-6915", devices: ["LEAP-04E58C0B-DIMMER-1005"]},
        { button: "LEAP-04E58C0B-BUTTON-6919", devices: ["LEAP-04E58C0B-DIMMER-1037"]},
    ],
    "LEAP-04E58C0B-BUTTON-6925",
    "LEAP-04E58C0B-BUTTON-6923"
);
