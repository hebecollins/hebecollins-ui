import {MODE} from "../mode";

/*has to change as server changes*/
const baseUrl = MODE === "local"? "http://hebecollinsui":
    MODE === "local_qburst"?"http://localhost:3000":"http://dev.hebecollins.com";

export const IMG_URL_OF = {
    GUEST_HOME: `${baseUrl}/images/background/guest_home.jpg`,
    GUEST_HOME_MOBILE: `${baseUrl}/images/background/guest_home_mobile.jpg`,
    LOGO_SHORT: `${baseUrl}/images/logo/HC_logo.png`,
    LOGO_EXTENDED: `${baseUrl}/images/logo/HC_logo_extended.jpg`,
    EXERCISES: `${baseUrl}/images/exercise_icons`
};