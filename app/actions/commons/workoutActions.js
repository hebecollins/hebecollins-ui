import {ADD_WORKOUT} from "../types";
import {deepCloneArray} from "../../Toolbox/Helpers/extra";
import {postJSON} from "../../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../../config/backendRoutes";

export function addWorkoutToRedux(dayWorkout, dayName) {
    const relevantData = deepCloneArray(dayWorkout).map((state) => {
        delete state.errors
        return state
    });//creating a copy to avoid mutation

    const dataToBeStored = {
        [dayName]: relevantData
    };

    return dispatch => {
        dispatch(addWorkout(dataToBeStored));
        return true;
    }
}

export function addWorkoutToServer(workout,gymId,clientId) {
    console.log("addWorkoutToServer");
    const route = `/${gymId}${BACKEND_ROUTES.WORKOUT.ASSIGN}/${clientId}`;
    const dataToBeSent = {
        "workout":workout
    }
    return dispatch => {
        postJSON(dataToBeSent,route).then(res=>{
            console.log(res);
        });
    }
}

export function addWorkout(workout) {
    return {
        type: ADD_WORKOUT,
        workout: workout
    }
}
