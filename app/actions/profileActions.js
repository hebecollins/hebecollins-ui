import {postMedia} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";

export const updateProfilePic = (image) => {
    const dataToBePosted = {
        'image': image
    };

    return postMedia(dataToBePosted, BACKEND_ROUTES.COMMONS.POST_PROFILE_PIC).then(res => {
        console.log(res);
    })
};

export const TrainerProfile = (id)=>{

};