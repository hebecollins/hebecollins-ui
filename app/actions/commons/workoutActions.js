import {ADD_WORKOUT} from "../types";
import {deepCloneArray} from "../../Toolbox/Helpers/extra";

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

export function addWorkout(workout) {
    return {
        type: ADD_WORKOUT,
        workout: workout
    }
}
