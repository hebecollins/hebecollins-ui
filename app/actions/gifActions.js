import React from 'react'
import {get,postMedia} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";

export const getExerciseListForGif = ()=>{
    return get(BACKEND_ROUTES.ADMIN.EXERCISE_LIST)
};

export const postGifForExercise = (gif,exerciseName)=>{
    console.log(gif);
    const dataToBePosted = {
        gif:gif,
        exercise_name:exerciseName
    };

    return postMedia(dataToBePosted,BACKEND_ROUTES.ADMIN.POST_EXERCISE_GIF)
};