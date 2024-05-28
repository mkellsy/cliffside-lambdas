import { LEDControl } from "./Modules/LEDControl";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const control = new LEDControl();

module.exports = sunnataSelectControl(
    control,
    ["LEAP-04E58C0B-KEYPAD-18039"],
    [
        { button: "LEAP-04E58C0B-BUTTON-18050", devices: ["LEAP-04E58C0B-DIMMER-18073"]},
        { button: "LEAP-04E58C0B-BUTTON-18054", devices: ["LEAP-04E58C0B-DIMMER-1080"]},
        { button: "LEAP-04E58C0B-BUTTON-18058", devices: ["LEAP-04E58C0B-DIMMER-1984", "LEAP-04E58C0B-DIMMER-4212"]},
    ],
    "LEAP-04E58C0B-BUTTON-18064",
    "LEAP-04E58C0B-BUTTON-18062"
);
