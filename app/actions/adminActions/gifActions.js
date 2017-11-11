import React from 'react'
import {get,postMedia} from "../../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../../config/backendRoutes";


/** gets list of exercises which doesn't have a GIF on the server
 */
export const getExercisesWithoutGif = ()=>{
    return get(BACKEND_ROUTES.ADMIN.EXERCISES_WITHOUT_GIF)
};

/** gets list of exercises which does have a GIF on the server
 */
export const getExercisesWithGif = ()=>{
    return get(BACKEND_ROUTES.ADMIN.EXERCISES_WITH_GIF)
};



export const postGifForExercise = (gif,exerciseName)=>{
    console.log(gif);
    const dataToBePosted = {
        gif:gif,
        exercise_name:exerciseName
    };
    return postMedia(dataToBePosted,BACKEND_ROUTES.ADMIN.POST_EXERCISE_GIF)
};