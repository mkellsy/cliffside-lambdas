import { StateManager } from "./Modules/StateManager";
import { picoSelectControl } from "./Mappings/PicoSelectControl";

const state = new StateManager("PrimaryBedroomRemote");

module.exports = picoSelectControl(
    state,
    [
        { button: "LEAP-04E58C0B-BUTTON-7352", devices: ["BAF-UNKNOWN-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-14449", devices: ["BAF-UNKNOWN-UPLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-14453", devices: ["LEAP-04E58C0B-DIMMER-2024"] },
        { button: "LEAP-04E58C0B-BUTTON-7364", devices: ["LEAP-04E58C0B-DIMMER-1729", "LEAP-04E58C0B-DIMMER-1691"] },
    ],
    "LEAP-04E58C0B-BUTTON-2729",
    "LEAP-04E58C0B-BUTTON-2732",
    "LEAP-04E58C0B-BUTTON-2735",
    "LEAP-04E58C0B-BUTTON-2738",
    "LEAP-04E58C0B-BUTTON-3799",
);
