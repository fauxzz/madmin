import { statusAccount, vehiclesDeliver } from "./mapTools";

export function RamdonCode() {
    let chars = "01234567890"
    let lon = 6;
    let code = "";
    for (let x=0; x<lon; x++) {
        let rand = Math.floor(Math.random()*chars.length);
        code+=chars.substr(rand,1);
    }
    return code;
}

export const getStatusString = (value) => statusAccount[value];
export const getVehiclesString = (value) => vehiclesDeliver[value];