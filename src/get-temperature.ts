import fs from 'fs'

export function GetTemperatureFrom(serial: string) : number {
    let w1SlaveFileName = `/sys/bus/w1/devices/28-${serial}/w1_slave`;
    let fd : number;
    try
    {
        let contents = fs.readFileSync(w1SlaveFileName, {encoding: "utf8"});
        let lines = contents.split('\n');
        if (lines[0].length != 39) {
            return -1;
        }
        let milliCString = lines[1].slice(-5);
        let tempF = (parseInt(milliCString)/1000.0)*(9.0/5.0) + 32.0;
        return tempF;
    } catch (e) {
        console.log("test");
        return -2;
    }
}