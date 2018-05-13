import React from 'react'
import {get,postMedia} from "../../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../../config/backendRoutes";
import {addFlashMessage} from "../actionStore";


/** gets list of available muscleGroups
 */
export const getMuscleGroupList = ()=>{
    return get(BACKEND_ROUTES.ADMIN.LIST_MUSCLE_GROUP)
};


/** gets list of available muscleGroups along with their respective IDs
 */
export const getMuscleGroupVerboseList = ()=>{
    return get(BACKEND_ROUTES.ADMIN.LIST_MUSCLE_GROUP_VERBOSE)
};



/** post muscleGroup along with its icon
 */
export const addMuscleGroupOnServer = (icon, muscleGroup)=>{
    const dataToBeSent = {
        icon:icon,
        muscle_group:muscleGroup
    };

    return dispatch => {
        return postMedia(dataToBeSent,BACKEND_ROUTES.ADMIN.ADD_MUSCLE_GROUP).then(res=>{
            dispatch(addFlashMessage({
                type:"success",
                text:res.data.msg
            }))
        })
    }
};


/** update muscleGroup along with its icon
 */
export const updateMuscleGroupOnServer = (icon, muscleGroup)=>{
    const dataToBeSent = {
        icon:icon,
        muscle_group:muscleGroup
    };

    return dispatch => {
        return postMedia(dataToBeSent,BACKEND_ROUTES.ADMIN.UPDATE_MUSCLE_GROUP).then(res=>{
            dispatch(addFlashMessage({
                type:"success",
                text:res.data.msg
            }))
        })
    }
};

