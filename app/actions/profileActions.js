import {get, postJSON, postMedia} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";

export const updateProfilePic = (image) => {
    const dataToBePosted = {
        'image': image
    };
    return postMedia(dataToBePosted, BACKEND_ROUTES.COMMONS.POST_PROFILE_PIC)
};

export const getProfile = ()=>{
    const route = BACKEND_ROUTES.COMMONS.PROFILE;
    return get(route)
};

export const updateProfileInfo = (data) =>{
  const dataToBePosted = {
      experience:data.experience,
      achievements : data.achievements,
      certifications: data.certifications,
      speciality: data.speciality
  };

  return postJSON(dataToBePosted, BACKEND_ROUTES.COMMONS.PROFILE)
};