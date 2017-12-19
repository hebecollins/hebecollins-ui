import {get, postJSON, postMedia} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {addFlashMessage} from "./actionStore";
import {store} from "../index";

export const addGymToServer = (data) => {
    const dataToBeSent = {
        gym_name: data.gym_name,
        street_address: data.street_address,
        locality: data.locality,
        district: data.district,
        pin: data.pin,
        state: data.state,
        country: data.country,
    };

    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.MANAGER.ADD_GYM).then(res => {
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        })
    }
};

/** Gets entire gym profile data from server
 * @param gymId
 **/
export const getGymProfile = (gymId) => {
    const route = `${gymId}${BACKEND_ROUTES.COMMONS.GYM_PROFILE}`;
    return get(route)
};

/**Posts cover photo to the server
 * @param coverPhoto
 **/
export const updateCoverPhoto = (coverPhoto) => {

    const gymId = store.getState().selectedGym.gym_id;
    const dataToBeSent = {
        image: coverPhoto
    };
    const route = `${gymId}${BACKEND_ROUTES.MANAGER.GYM.COVER_PHOTO}`;
    return postMedia(dataToBeSent, route)
};

/**Posts cover photo to the server
 * @param logo
 **/
export const updateLogo = (logo) => {

    const gymId = store.getState().selectedGym.gym_id;
    const dataToBeSent = {
        image: logo
    };
    const route = `${gymId}${BACKEND_ROUTES.MANAGER.GYM.LOGO}`;
    return postMedia(dataToBeSent, route)
};

export const updateGymInfo = (data, gymId) => {
    const dataToBePosted = {
        about: data.about,
        operating_days: data.operatingDays,
        operating_hours: data.operatingHours,
        fee_structure: data.feeStructure
    };
    const route = `${gymId}${BACKEND_ROUTES.MANAGER.GYM.PROFILE}`;

    return postJSON(dataToBePosted, route)
};

export const gymRatings = (gymId) => {
    const route = `${gymId}${BACKEND_ROUTES.MANAGER.GYM.REVIEWS}`;
    return get(route);
};

export const postGymReview = (gymId, data) => {
    const route = `${gymId}${BACKEND_ROUTES.MANAGER.GYM.REVIEWS}`;
    const dataToBePosted = {
        ratings: {
            quality_one: data.quality_one,
            quality_two: data.quality_two,
            quality_three: data.quality_three,
            quality_four: data.quality_four,
            quality_five: data.quality_five,
            title: data.title,
            description: data.description
        }
    };

    return dispatch=>{
        return postJSON(dataToBePosted, route).then(res => {
            dispatch(addFlashMessage({
                type:"success",
                text:res.data.msg
            }))
        });
    }
};


export const getGymListInTheArea=()=>{
     return get(BACKEND_ROUTES.COMMONS.GYM_LIST)
};