import {ADD_WORKOUT} from "../types";

export function addWorkoutToRedux(dayWorkout, dayName){
    // console.log("=======================================");
    // console.log(dayName);
    // console.log(dayWorkout);
    // console.log("=======================================");
    const copyDayWorkout = [...dayWorkout];//creating a copy to avoid mutation
    const dataToBeStored = {
            [dayName]:copyDayWorkout
    };

    return dispatch => {
         dispatch(addWorkout(dataToBeStored));
    }
}

export function addWorkout(workout){
    return {
        type: ADD_WORKOUT,
        workout:workout
    }
}
