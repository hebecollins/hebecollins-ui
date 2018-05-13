import React from 'react'
import {IMG_URL_OF} from "../../../../config/imageUrl";
import {BACKEND_ROUTES} from "../../../../config/backendRoutes";
import {BASE_URL} from "../../../../config/baseURL";

/**@param exercise => single exercise object with fields {exercise_name_id, exercise_name, sets, reps, muscle_group}
 * @param i => index of exercise for numbering
 */
export const RenderExercise = ({exercise, index, renderGif}) => {
    const {exercise_name_id, exercise_name, sets, reps, rest, muscle_group_id} = exercise;
    return (
        <div className="exercise-control">
            <span className="badge exercise-badge">{index + 1}</span>
            <div className="exercise-details flex">
                <div className="exercise-text">
                    <div className="orange-header">{exercise_name}</div>
                    <div className="exercise-body">
                        <div>
                            <div>
                                <label className="field">Sets :</label>
                                <label className="light-orange value">{sets}</label>
                            </div>
                            <div>
                                <label className="field">Reps :</label>
                                <label className="light-orange value">
                                    {Object.keys(reps).map((key) => (
                                        <label key={key} className="light-orange value">
                                            {reps[key]}
                                        </label>
                                    ))}
                                </label>
                            </div>
                            <div>
                                <label className="field">Rest :</label>
                                <label className="light-orange value">{rest} seconds</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="exercise-icons">
                    <div className="exercise-icon">
                         <img src={`${BASE_URL}${BACKEND_ROUTES.COMMONS.GET_MUSCLE_GROUP_ICON}/${muscle_group_id}`}/>
                        </div>
                    <div className="bottom right">
                        <button className="btn-icon"
                                onClick={() => renderGif(exercise_name_id, exercise_name)}>
                            <span className="glyphicon glyphicon-facetime-video"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

RenderExercise.propTypes = {
    exercise: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    renderGif: React.PropTypes.func.isRequired,
};


export const ExerciseGif = ({exerciseName, gif}) => {
    return (
        <div id="pop-on-screen">
            <div id="gif-container">
                <div className="white-center">{exerciseName}</div>
                <img id="gif" src={gif}/>
            </div>
        </div>
    )

};

ExerciseGif.propTypes = {
    exerciseName: React.PropTypes.string.isRequired,
    gif: React.PropTypes.string.isRequired,
};
