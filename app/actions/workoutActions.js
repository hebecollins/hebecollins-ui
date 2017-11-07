import {deepCloneArray} from "../Toolbox/Helpers/extra";
import {get, postJSON} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {addFlashMessage, addWorkout, clearWorkout, deleteSelectedUser} from "./actionStore";
import {redirectByName} from "../Toolbox/Helpers/redirect";

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


export function addAssignedWorkoutToServer(workout, gymId, clientId) {
    const route = `/${gymId}${BACKEND_ROUTES.WORKOUT.ASSIGN}/${clientId}`;
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
            dispatch(clearWorkout());
            redirectByName("CLIENT_LIST_FOR_TRAINER")
        });
    }
}

export function addCreatedWorkoutToServer(workout, gymId, label) {
    const route = `/${gymId}${BACKEND_ROUTES.WORKOUT.CREATE}`;
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
            dispatch(clearWorkout());
            redirectByName("SAVED_WORKOUT_LIST")
        });
    }
}

export function getSavedWorkoutList(gymId) {
    const route = `/${gymId}${BACKEND_ROUTES.WORKOUT.WORKOUT_LIST}`;
    return get(route)
}

export function deleteSavedWorkoutFromServer(labelId) {
    const route = `${BACKEND_ROUTES.WORKOUT.DELETE_WORKOUT_BY_LABEL}/${labelId}`;
    return get(route)
}

export function getSavedWorkoutByLabel(labelId) {
    const route = `${BACKEND_ROUTES.WORKOUT.GET_WORKOUT_BY_LABEL}/${labelId}`;
    return dispatch => {
        return get(route).then(res => {
            console.log(res.data.workout);
            dispatch(addWorkout(res.data.workout));
        })
    }
}