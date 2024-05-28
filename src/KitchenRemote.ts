import { ButtonControl } from "./Modules/ButtonControl";
import { picoSelectControl } from "./Mappings/PicoSelectControl";

const control = new ButtonControl();

module.exports = picoSelectControl(
    control,
    [
        { button: "LEAP-04E58C0B-BUTTON-14405", devices: ["LEAP-04E58C0B-DIMMER-1037"]},
        { button: "LEAP-04E58C0B-BUTTON-14427", devices: ["LEAP-04E58C0B-DIMMER-1005"]},
        { button: "LEAP-04E58C0B-BUTTON-14431", devices: ["LEAP-04E58C0B-DIMMER-1080"]},
        { button: "LEAP-04E58C0B-BUTTON-14417", devices: ["LEAP-04E58C0B-STRIP-7549", "LEAP-04E58C0B-STRIP-7556"]},
    ],
    "LEAP-04E58C0B-BUTTON-2372",
    "LEAP-04E58C0B-BUTTON-2375",
    "LEAP-04E58C0B-BUTTON-2378",
    "LEAP-04E58C0B-BUTTON-2381",
    "LEAP-04E58C0B-BUTTON-3256"
);
