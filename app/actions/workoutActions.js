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
            dispatch(clearWorkout());
            redirectByName("CLIENT_LIST_FOR_TRAINER")
        });
    }
}

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
            dispatch(clearWorkout());
            redirectByName("SAVED_WORKOUT_LIST")
        });
    }
}

export function getSavedWorkoutList(gymId) {
    const route = `/${gymId}${BACKEND_ROUTES.TRAINER.WORKOUT.LIST}`;
    return get(route)
}

export function deleteSavedWorkoutFromServer(labelId) {
    const route = `${BACKEND_ROUTES.TRAINER.WORKOUT.DELETE_BY_LABEL}/${labelId}`;
    return get(route)
}

export function getSavedWorkoutByLabel(labelId) {
    const route = `${BACKEND_ROUTES.TRAINER.WORKOUT.GET_BY_LABEL}/${labelId}`;
    return dispatch => {
        return get(route).then(res => {
            console.log(res.data.workout);
            dispatch(addWorkout(res.data.workout));
        })
    }
}

export function getCurrentWorkout(gymId) {

    const route = `/${gymId}${BACKEND_ROUTES.CLIENT.WORKOUT.CURRENT}`;
    console.log(route);
        return get(route).then(res => {
            console.log(res.data.workout);
        })
}