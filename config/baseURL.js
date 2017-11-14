import {MODE} from "../mode";

const developmentURL = "http://api.hebecollins.com";
const productionURL = "http://hebecollins.com";
const localURL = "http://hebecollinsapi";
const localQburstURL = "http://localhost";

export const BASE_URL =
    (MODE === 'production') ? productionURL :
        (MODE === 'development') ? developmentURL :
            (MODE === 'local_qburst') ? localQburstURL : localURL;
