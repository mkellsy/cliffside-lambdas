import { StateControl } from "./Modules/StateControl";
import { SunnataTrippleControl } from "./Mappings/SunnataTrippleControl";

const state = new StateControl();

module.exports = SunnataTrippleControl(
    state,
    "LEAP-04E58C0B-DIMMER-18073",
    "LEAP-04E58C0B-DIMMER-1080",
    "LEAP-04E58C0B-DIMMER-1984",
    "LEAP-04E58C0B-BUTTON-18050",
    "LEAP-04E58C0B-BUTTON-18054",
    "LEAP-04E58C0B-BUTTON-18058",
    "LEAP-04E58C0B-BUTTON-18064",
    "LEAP-04E58C0B-BUTTON-18062"
);
