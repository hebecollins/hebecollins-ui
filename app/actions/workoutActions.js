import {deepCloneArray} from "../Toolbox/Helpers/extra";
import {get, getMedia, postJSON} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {addFlashMessage, addWorkout, clearWorkout, deleteSelectedUser, storeExerciseList} from "./actionStore";
import {redirectByName} from "../Toolbox/Helpers/redirect";


/**Appends day workout to workout in redux store so that it can be readily available
 * @param dayWorkout => workout of the day
 * @param dayName => day name : sun, mon, tue, wed, thu,fri, sat
 * */
export function addWorkoutToRedux(dayWorkout, dayName) {
    const relevantData = deepCloneArray(dayWorkout).map((state) => {
        delete state.errors;
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


/**Assigns workout to selected client on the server
 * @param workout => workout array
 * @param gymId => gymId of selected gym
 * @param clientId=> userId of selected client
 * */
export function addAssignedWorkoutToServer(workout, gymId, clientId) {
    const route = `/${gymId}${BACKEND_ROUTES.TRAINER.WORKOUT.ASSIGN}/${clientId}`;
    const dataToBeSent = {
        "workout": workout
    };
    return dispatch => {
        return postJSON(dataToBeSent, route).then(res => {
            dispatch(addFlashMessage({
                type: "success",
                text: res.data.msg
            }));
            dispatch(deleteSelectedUser());
            redirectByName("CLIENT_LIST_FOR_TRAINER")
        });
    }
}


/**Adds workout created by trainer to the server with label as a tag
 * @param workout => workout array
 * @param gymId => gymId of selected gym
 * @param label=> label corresponds to the given workout
 * */
export function addCreatedWorkoutToServer(workout, gymId, label) {
    const route = `/${gymId}${BACKEND_ROUTES.TRAINER.WORKOUT.CREATE}`;
    const dataToBeSent = {
        "label": label,
        "workout": workout
    };
    return dispatch => {
        return postJSON(dataToBeSent, route).then(res => {
            dispatch(addFlashMessage({
                type: "success",
                text: res.data.msg
            }));
            redirectByName("SAVED_WORKOUT_LIST")
        });
    }
}


/**Gets saved Workout for a trainer by label
 * @param labelId => id corresponds to a particular label
 * */
export function getSavedWorkoutByLabel(labelId) {
    const route = `${BACKEND_ROUTES.TRAINER.WORKOUT.GET_BY_LABEL}/${labelId}`;
    return dispatch => {
        return get(route).then(res => {
            dispatch(addWorkout(res.data.workout));
        })
    }
}


/**Gets latest workout for a client as client is logged in and stores it in redux
 * @param gymId=> gymId of selected gym
 * */
export function getCurrentWorkoutToRedux(gymId) {

    const route = `/${gymId}${BACKEND_ROUTES.CLIENT.WORKOUT.CURRENT}`;
    return dispatch =>{
        return get(route).then(res => {
            dispatch(addWorkout(res.data.workout));
        })
    }

}


/**clears workout data from redux
 * */
export function clearWorkoutFromRedux() {
    return dispatch => {
        dispatch(clearWorkout());
    }
}

/**gets saved workout list for a trainer in a particular gym from the server
 * @param gymId => gymId from selectedGym
 * */
export function getSavedWorkoutList(gymId) {
    const route = `/${gymId}${BACKEND_ROUTES.TRAINER.WORKOUT.LIST}`;
    return get(route)
}


/**Deletes saved workout data from the server by label
 * @param labelId => id corresponds to selected label
 * */
export function deleteSavedWorkoutFromServer(labelId) {
    const route = `${BACKEND_ROUTES.TRAINER.WORKOUT.DELETE_BY_LABEL}/${labelId}`;
    return get(route)
}


/**Gets exercise list from the server and store it in redux
 * */
export function getExerciseListToRedux() {
    return dispatch => {
        return get(BACKEND_ROUTES.COMMONS.SUGGESTION.EXERCISES).then(res => {
            dispatch(storeExerciseList(res.data.exercises));
        })
    }
}


/**Gets exercise GIF corresponding to id from the server
 * @param id => exerciseId
 * */
export function getExerciseGifFromServer(id) {
    const route = `${BACKEND_ROUTES.COMMONS.GET_EXERCISE_GIF}/${id}`;
    return get(route)
}