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

export const getProfileById= (gymId, userId)=>{
    const route = `${gymId}${BACKEND_ROUTES.COMMONS.PROFILE}/${userId}`;
    return get(route)
};

export const updateProfileInfoForTrainer = (data) =>{
  const dataToBePosted = {
      experience:data.experience,
      achievements : data.achievements,
      certifications: data.certifications,
      speciality: data.speciality
  };

  return postJSON(dataToBePosted, BACKEND_ROUTES.COMMONS.PROFILE)
};

export const updateProfileInfoForClient = (data) =>{
  const dataToBePosted = {
      batch:data.batch,
      primary_goal : data.goal,
      goal_description: data.goal_description,
  };

  return postJSON(dataToBePosted, BACKEND_ROUTES.COMMONS.PROFILE)
};