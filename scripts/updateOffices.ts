import fs from "fs";
import * as OfficeInfoService from "../services/OfficeInfoService";

const updateOffices = async () => {
    const offices = await OfficeInfoService.updateInfo();
    fs.writeFileSync(`${__dirname}/../../data/offices.json`, JSON.stringify(offices));
}

updateOffices();