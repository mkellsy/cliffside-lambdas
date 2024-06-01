import { StateManager } from "./Modules/StateManager";
import { sunnataSelectControl } from "./Mappings/SunnataSelectControl";

const state = new StateManager("EntrywayKeypad");

module.exports = sunnataSelectControl(
    state,
    ["LEAP-04E58C0B-KEYPAD-23291", "LEAP-04E58C0B-KEYPAD-9140"],
    [
        { button: "LEAP-04E58C0B-BUTTON-23300", devices: ["BAF-123456-DOWNLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23304", devices: ["BAF-123456-UPLIGHT"] },
        { button: "LEAP-04E58C0B-BUTTON-23308", devices: ["BAF-123456-FAN"] },
        { button: "LEAP-04E58C0B-BUTTON-7364", devices: ["LEAP-04E58C0B-DIMMER-1691", "LEAP-04E58C0B-DIMMER-1729"] },
        { button: "LEAP-04E58C0B-BUTTON-9153", devices: ["LEAP-04E58C0B-DIMMER-2024"] },
        { button: "LEAP-04E58C0B-BUTTON-9157", devices: ["LEAP-04E58C0B-SWITCH-10544"] },
    ],
    "LEAP-04E58C0B-BUTTON-23314",
    "LEAP-04E58C0B-BUTTON-23312",
    {
        button: "LEAP-04E58C0B-BUTTON-14368",
        devices: [
            "BAF-123456-DOWNLIGHT",
            "BAF-123456-UPLIGHT",
            "BAF-123456-FAN",
            "LEAP-04E58C0B-DIMMER-2024",
            "LEAP-04E58C0B-DIMMER-1655",
            "LEAP-04E58C0B-SWITCH-1787",
            "LEAP-04E58C0B-SWITCH-1835",
            "LEAP-04E58C0B-DIMMER-1817",
            "LEAP-04E58C0B-DIMMER-1691",
            "LEAP-04E58C0B-SWITCH-1709",
            "LEAP-04E58C0B-DIMMER-1729",
        ],
    },
);
