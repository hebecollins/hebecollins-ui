import React from 'react'
import {get,postMedia} from "../../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../../config/backendRoutes";
import {addFlashMessage} from "../actionStore";


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

/** gets list of exercises which does have a GIF on the server
 */
export const getCategoryList = ()=>{
    return get(BACKEND_ROUTES.ADMIN.LIST_MUSCLE_GROUP)
};


/** Posts gif for a given exercise
 * @param gif => .gif file
 * @param exerciseName => exerciseName
 * @param muscleGroup => muscleGroup
 * */
export const postGifForExercise = (gif,exerciseName,muscleGroup)=>{
    console.log(gif);
    const dataToBePosted = {
        gif:gif,
        exercise_name:exerciseName,
        muscle_group:muscleGroup
    };
    return dispatch =>{
        return   postMedia(dataToBePosted,BACKEND_ROUTES.ADMIN.POST_EXERCISE_GIF).then(res=>{
            dispatch(addFlashMessage({
                type: "success",
                text: res.data.msg
            }))
        })
    }
};