import React from 'react'
import {connect} from 'react-redux'
import {
    deleteSavedWorkoutFromServer, getExerciseGifFromServer, getSavedWorkoutByLabel,
    getSavedWorkoutList
} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {addFlashMessage} from "../../../actions/actionStore";
import {deepCloneArray, deepCloneObject} from "../../../Toolbox/Helpers/extra";
import {Fade, Slide} from "../../others/extra/Animation";
import {getExercisesWithGif} from "../../../actions/adminActions/gifActions";
import {ExerciseGif} from "../../others/display/RenderExercise";

class GifList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            hasServerResponded: false,
            isEditing: false,
            displayGif: false,
            exerciseNameId: '',
            exerciseName: '',
            gif: '',
        };

        this.renderGif = this.renderGif.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillMount() {
        getExercisesWithGif().then(
            (res) => {
                const exerciseList = res.data.exercise_list;
                if (isEmpty(exerciseList)) {
                    redirectByName("NO_RECORDS_FOUND")
                } else {
                    this.setState({exerciseList: exerciseList, hasServerResponded: true});
                }
            }
        )
    }

    componentDidUpdate() {
        if (this.state.displayGif) {
            let el = document.getElementById('pop-on-screen');
            el.addEventListener('click', () => {
                el.removeEventListener('click', () => {
                });
                this.setState({displayGif: false}
                )

            });
        }
    }


    /** gets gif from the server with same exercise_name_id
     */
    renderGif(exerciseNameId, exerciseName) {
        getExerciseGifFromServer(exerciseNameId).then(
            (res) => {
                this.setState({
                    displayGif: true,
                    exerciseNameId: exerciseNameId,
                    exerciseName: exerciseName,
                    gif: res.data,
                    hasServerResponded: true
                })
            }
        )
            // .catch(err => errorResponse(err))
    }

    onEdit(exerciseNameId) {
        this.setState({isEditing: true});
    }

    render() {

        const {exerciseList, exerciseName, gif} = this.state;

        const labelList = exerciseList.map((exercise, index) => {
                const {exercise_name, id, muscle_group} = exercise;
                return (
                    <div key={id} className="list-element">
                        <div className="list-individual-info">
                            <label className="field">Exercise Name :</label>
                            <label className="value">{exercise_name}</label><br/>
                            <label className="field">Category (Target Muscle Group) :</label>
                            <label className="value">{muscle_group}</label><br/>
                        </div>
                        <div className="pull-right">
                            <ButtonOrange
                                onClick={() => this.renderGif(id,exercise_name)}
                                disabled={this.state.isEditing}
                                label={"View Gif"}/>
                            <ButtonOrange
                                onClick={() => this.onEdit(id)}
                                disabled={this.state.isEditing}
                                label={"Edit"}/>
                        </div>
                    </div>
                );
            }
        );

        const gifContainer = <ExerciseGif exerciseName={exerciseName} gif={gif}/>

        return this.state.hasServerResponded ?
            <div className="content">
                <SingleScreen2>
                    <h1 className="white-center">Saved Workout List</h1>
                    <Fade>{labelList}</Fade>
                </SingleScreen2>
                <div>
                    {this.state.displayGif ? gifContainer : <div/>}
                </div>

            </div> :
            <Loading/>

    }
}


export default GifList