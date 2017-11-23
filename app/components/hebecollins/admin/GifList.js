import React from 'react'
import {getExerciseGifFromServer} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {Fade} from "../../others/extra/Animation";
import {getExercisesWithGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {getMuscleGroupList} from "../../../actions/adminActions/muscleGroupActions";
import {ExerciseGif} from "../../others/display/RenderExercise";
import {connect} from 'react-redux'
import ExerciseAddForm from "../../others/inputFieldGroup/admin/ExerciseAddForm";

class GifList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],//to list out exercises
            muscleGroupList: [],//to list out muscle groups that are available in database
            exercise_name: '',
            gif: '',
            muscle_group: '',
            hasServerResponded: false,
            isEditing: [],//array of boolean, it tells which of the given workouts are being edited
            isAddingNew: false,// if a new entry has been adding
            disableButton: false,//triggers button disabling if true
            displayGif: false,//triggers gif display
            exerciseNameId: '',//required for getting Gif from the server
        };

        //renders gif
        this.renderGif = this.renderGif.bind(this);

        // turns isEditing state true
        this.onEdit = this.onEdit.bind(this);

        //turns isAdding new as true
        this.addNew = this.addNew.bind(this);

        //resets state to its initial value
        this.resetState = this.resetState.bind(this);
    }

    /*gets exercise list from the server and assign it to exerciseList state*/
    componentWillMount() {
        getExercisesWithGif().then(res => {
                const exerciseList = res.data.exercise_list;

                    this.setState({exerciseList: exerciseList, hasServerResponded: true});
                    getMuscleGroupList().then(res => {
                        this.setState({muscleGroupList: res.data})
                    });//for muscle group dropdown
            }
        ).catch(err => errorResponse(err))
    }


    componentDidUpdate() {
        if (this.state.displayGif) {
            let el = document.getElementById('pop-on-screen');
            el.addEventListener('click', () => {
                el.removeEventListener('click', () => {
                });//removes the active event listener on a click
                this.setState({displayGif: false, disableButton: false})
            });
        }
    }


    resetState() {
        this.componentWillMount();// to refresh the state it sends request to server... As this is admin panel, so it doesn't matter
        this.setState({
            exercise_name: '', gif: '', muscle_group: '', errors: '',
            isEditing: false, isAddingNew: false, disableButton: false
        })
    }

    addNew() {
        this.setState({isAddingNew: true, disableButton: true});
    }

    /** gets gif from the server with same exercise_name_id
     */
    renderGif(exerciseNameId, exerciseName) {
        getExerciseGifFromServer(exerciseNameId).then(
            (res) => {
                this.setState({
                    displayGif: true,
                    exerciseNameId: exerciseNameId,
                    exercise_name: exerciseName,
                    gif: res.data,
                    hasServerResponded: true,
                    disableButton: true
                });
            }
        ).catch(err => errorResponse(err))
    }

    onEdit(exerciseName, index) {
        let temp = deepCloneArray(this.state.isEditing);
        temp[index] = true;
        this.setState({isEditing: temp, exercise_name: exerciseName, disableButton: true});
    }


    render() {
        const {exerciseList, exercise_name, gif, muscleGroupList, isEditing, disableButton} = this.state;
        const {postGifForExercise} = this.props;

        const editForm =
            <ExerciseAddForm
                muscleGroupList={muscleGroupList}
                header={exercise_name}
                exerciseName={exercise_name}
                editMode={true}
                resetState={this.resetState}
                postGif={postGifForExercise}
            />;

        const gifContainer = <ExerciseGif exerciseName={exercise_name} gif={gif}/>;

        const addForm =
            <ExerciseAddForm
                muscleGroupList={muscleGroupList}
                header={"Adding New Exercise"}
                editMode={false}
                resetState={this.resetState}
                postGif={postGifForExercise}
            />;

        const GifList = exerciseList.map((exercise, index) => {
                const {exercise_name, id, muscle_group} = exercise;
                return (
                    <div key={id} className="list-element">
                        {isEditing[index] ? editForm :
                            <div>
                                <div className="list-individual-info">
                                    <label className="field">Exercise Name :</label>
                                    <label className="value"><strong>{exercise_name}</strong></label><br/>
                                    <label className="field">Target Muscle Group :</label>
                                    <label className="value"><strong>
                                        {muscle_group ? muscle_group.toUpperCase() : muscle_group}
                                    </strong></label><br/>
                                </div>
                                <div className="pull-right">
                                    <ButtonOrange
                                        onClick={() => this.renderGif(id, exercise_name)}
                                        disabled={disableButton}
                                        label={"View Gif"}/>
                                    <ButtonOrange
                                        onClick={() => this.onEdit(exercise_name, index)}
                                        disabled={disableButton}
                                        label={"Edit"}/>
                                </div>
                            </div>}
                    </div>
                );
            }
        );

        return this.state.hasServerResponded ?
            <div className="content">
                <SingleScreen2>
                    <h1 className="white-center">Uploaded Gif List</h1>
                    {
                        this.state.isAddingNew ? addForm :
                            <div className="top-right">
                                <button className="btn-hebecollins-orange"
                                        onClick={this.addNew}
                                        disabled={disableButton}>
                                    <span className="glyphicon glyphicon-plus"/> Add New
                                </button>
                            </div>
                    }
                    <Fade>
                        <div>{GifList}</div>
                    </Fade>
                </SingleScreen2>
                <div>
                    {this.state.displayGif ? gifContainer : <div/>}
                </div>
            </div> : <Loading/>
    }
}


export default connect(null, {postGifForExercise})(GifList);