import { ButtonControl } from "./Modules/ButtonControl";
import { picoSelectControl } from "./Mappings/PicoSelectControl";

const control = new ButtonControl();

module.exports = picoSelectControl(
    control,
    [
        { button: "LEAP-04E58C0B-BUTTON-7371", devices: ["LEAP-04E58C0B-DIMMER-1135"]},
        { button: "LEAP-04E58C0B-BUTTON-14438", devices: ["LEAP-04E58C0B-DIMMER-1151"]},
        { button: "LEAP-04E58C0B-BUTTON-14442", devices: ["LEAP-04E58C0B-DIMMER-1167"]},
        { button: "LEAP-04E58C0B-BUTTON-7383", devices: ["LEAP-04E58C0B-DIMMER-2041", "LEAP-04E58C0B-DIMMER-10561"]},
    ],
    "LEAP-04E58C0B-BUTTON-2441",
    "LEAP-04E58C0B-BUTTON-2444",
    "LEAP-04E58C0B-BUTTON-2447",
    "LEAP-04E58C0B-BUTTON-2450",
    "LEAP-04E58C0B-BUTTON-3310"
);
