import React from 'react'
import {getExerciseGifFromServer} from "../../../actions/workoutActions";
import {ButtonOrange} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {deepCloneArray, scrollToError} from "../../../Toolbox/Helpers/extra";
import {Fade} from "../../others/extra/Animation";
import {getCategoryList, getExercisesWithGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {ExerciseGif} from "../../others/display/RenderExercise";
import {Select, TextField, UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateGifForm} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux'

class GifList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],//to list out exercises
            categoryList: [],//to list out muscle groups that are available in database
            exercise_name: '',
            gif: {},
            muscle_group: '',
            hasServerResponded: false,
            isEditing: [],//array of boolean, it tells which of the given workouts are being edited
            isAddingNew: false,// if a new entry has been adding
            disableButton: false,//triggers button disabling if true
            displayGif: false,//triggers gif display
            exerciseNameId: '',//required for getting Gif from the server
            errors: ''//errors in the input field
        };

        //renders gif
        this.renderGif = this.renderGif.bind(this);

        // turns isEditing state true
        this.onEdit = this.onEdit.bind(this);

        //turns isAdding new as true
        this.addNew = this.addNew.bind(this);

        //submits all the changes and send it to server
        this.onSubmit = this.onSubmit.bind(this);

        //redundant
        this.onCancelAdd = this.onCancelAdd.bind(this);

        //redundant
        this.onCancelEdit = this.onCancelEdit.bind(this);

        //resets state to its initial value
        this.resetState = this.resetState.bind(this);

        // updates the changes happening in input field
        this.onChange = this.onChange.bind(this);

        //when any file gets uploaded
        this.onUpload = this.onUpload.bind(this);
    }

    /*gets exercise list from the server and assign it to exerciseList state*/
    componentWillMount() {
        getExercisesWithGif().then((res) => {
                const exerciseList = res.data.exercise_list;

                if (isEmpty(exerciseList)) redirectByName("NO_RECORDS_FOUND");
                else {
                    this.setState({exerciseList: exerciseList, hasServerResponded: true});
                    getCategoryList().then(res => {
                        this.setState({categoryList: res.data})
                    });//for muscle group dropdown
                }
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
        this.setState({
            exercise_name: '', gif: {}, muscle_group: '', errors: '',
            isEditing: false, isAddingNew: false, disableButton: false
        })
    }

    onUpload(e) {
        const gif = e.target.files[0];
        this.setState({gif: gif});
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    addNew() {
        this.resetState();
        this.setState({isAddingNew: true, disableButton: true});
    }

    isValid() {
        scrollToError();
        console.log(this.state);
        const {errors, isValid} = validateGifForm(this.state);
        if (!isValid) {
            this.setState({errors: errors})
        }
        return isValid;
    }

    onSubmit() {
        const {exercise_name, muscle_group, gif} = this.state;
        console.log(this.state.errors);
        if (this.isValid()) {
            this.props.postGifForExercise(gif, exercise_name, muscle_group).then(res => {
                    this.resetState();
                }
            ).catch(err => errorResponse(err))
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

    onCancelAdd() {
        this.resetState();
    };

    onCancelEdit() {
        this.resetState();
    };

    render() {
        const {exerciseList, exercise_name, gif, categoryList, errors, isEditing, disableButton} = this.state;

        const editForm =
            <div className="gif-form">
                <div className="exercse-control">
                    <div className="exercise-details">
                        <div className="orange-header">{exercise_name}</div>
                        <div className="margin">
                            <Select
                                field="muscle_group" label="Select the target muscle group" isIconNeeded={false}
                                onChange={this.onChange} error={errors.muscle_group}>
                                {/*adds categoryList elements into option*/}
                                {
                                    categoryList.map((category, index) => {
                                        return <option key={index}
                                                       value={category}>{category.toUpperCase()}</option>
                                    })
                                }
                            </Select>

                            <UploadFile onUpload={this.onUpload} field="gif" error={errors.gif}/>
                            <ButtonOrange onClick={this.onSubmit} label="Update"/>
                            <ButtonOrange onClick={this.resetState} label="Cancel"/>
                        </div>
                    </div>
                </div>
            </div>;

        const gifContainer = <ExerciseGif exerciseName={exercise_name} gif={gif}/>

        const addForm =
            <div className="gif-form">
                <div className="exercse-control">
                    <div className="padding-top exercise-details">
                        <TextField field="exercise_name" onChange={this.onChange} value={exercise_name}
                                   label="Exercise Name" isIconNeeded={false} error={errors.exercise_name}/>

                        <Select
                            field="muscle_group" label="Select the target muscle group" isIconNeeded={false}
                            onChange={this.onChange} error={errors.muscle_group}>
                            {/*adds categoryList elements into option*/}
                            {
                                categoryList.map((category, index) => {
                                    return <option key={index} value={category}>{category.toUpperCase()}</option>
                                })
                            }
                        </Select>

                        <UploadFile onUpload={this.onUpload} field="gif" error={errors.gif}/>

                        <ButtonOrange
                            onClick={this.onSubmit} label="Upload"/>
                        <ButtonOrange
                            onClick={this.onCancelAdd} label="Cancel"/>
                    </div>
                </div>
            </div>;


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
                    {this.state.isAddingNew ? addForm :
                        <ButtonOrange
                            onClick={this.addNew}
                            label={"Add New"}
                            disabled={disableButton}
                        />
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