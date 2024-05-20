import { StateControl } from "./Modules/StateControl";
import { SunnataTrippleControl } from "./Mappings/SunnataTrippleControl";

const state = new StateControl();

module.exports = SunnataTrippleControl(
    state,
    "LEAP-04E58C0B-DIMMER-6934",
    "LEAP-04E58C0B-DIMMER-1005",
    "LEAP-04E58C0B-DIMMER-1037",
    "LEAP-04E58C0B-BUTTON-6911",
    "LEAP-04E58C0B-BUTTON-6915",
    "LEAP-04E58C0B-BUTTON-6919",
    "LEAP-04E58C0B-BUTTON-6925",
    "LEAP-04E58C0B-BUTTON-6923"
);
