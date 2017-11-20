import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {get, postJSON} from "../Toolbox/Helpers/requestHandler";
import {addFlashMessage} from "./actionStore";

/**posts trainer's review
 * @param data => data to be posted
 * @param trainerId => trainerId for which review is given
 * @param gymId => currently selected gymId
 * */
export const postTrainerReview = (data, gymId, trainerId ) => {
    const route = `${gymId}${BACKEND_ROUTES.COMMONS.REVIEW_TRAINER}/${trainerId}`;
    const datatoBePosted = {
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
        return postJSON(datatoBePosted, route).then(res => {
            dispatch(addFlashMessage({
                type:"success",
                text:res.data.msg
            }))
        });
    }
    };

/**gets trainers review by trainerId
 * @param gymId
 * @param trainerId
 * */
export const getTrainerReviews = (gymId, trainerId) =>{
    const route = `${gymId}${BACKEND_ROUTES.COMMONS.REVIEW_TRAINER}/${trainerId}`;
    return get(route)
};