import {MODE} from "../mode";

/*has to change as server changes*/
const baseUrl = MODE === "local"? "http://hebecollinsui": "http://dev.hebecollins.com";

export const IMG_URL_OF = {
    GUEST_HOME: `${baseUrl}/images/guest_home.jpg`,
    GUEST_HOME_MOBILE: `${baseUrl}/images/guest_home_mobile.jpg`,
    LOGO_SHORT: `${baseUrl}/images/HC_logo.png`,
    LOGO_EXTENDED: `${baseUrl}/images/HC_logo_extended.jpg`,
};