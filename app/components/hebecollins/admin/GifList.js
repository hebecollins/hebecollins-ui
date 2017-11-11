import React from 'react'
import {getExerciseGifFromServer} from "../../../actions/workoutActions";
import {ButtonOrange, UploadFile} from "../../others/display/Buttons";
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import isEmpty from 'lodash/isEmpty'
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {deepCloneArray, scrollToError} from "../../../Toolbox/Helpers/extra";
import {Fade} from "../../others/extra/Animation";
import {getCategoryList, getExercisesWithGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {ExerciseGif} from "../../others/display/RenderExercise";
import {Select, TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateGifForm} from "../../../Toolbox/Validation/helpers";
import classnames from 'classnames'
import {addFlashMessage} from "../../../actions/actionStore";
import {connect} from 'react-redux'

class GifList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            categoryList: [],
            exercise_name: '',
            gif: {},
            muscle_group: '',
            hasServerResponded: false,
            isEditing: [],
            isAddingNew: false,
            disableButton: false,
            displayGif: false,
            exerciseNameId: '',
            errors: ''
        };

        this.renderGif = this.renderGif.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.addNew = this.addNew.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancelAdd = this.onCancelAdd.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.resetState = this.resetState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
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
                getCategoryList().then(res => {
                    this.setState({categoryList: res.data})
                });
            }
        )
        // .catch(err => errorResponse(err))
    }

    resetState() {
        this.setState({
            exercise_name: '',
            gif: {},
            muscle_group: '',
            errors:'',
            isEditing:false,
            isAddingNew:false,
            disableButton:false
        })
    }

    onUpload(e) {
        const gif = e.target.files[0];//
        this.setState({gif: gif});
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

    onChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }

    addNew() {
        this.setState({isAddingNew: true, disableButton: true});
    }

    isValid() {
        scrollToError();
        const {errors, isValid} = validateGifForm(this.state)
        if (!isValid) {
            this.setState({errors: errors})
        }
        return isValid;
    }

    onSubmit() {
        const {exercise_name, muscle_group, gif} = this.state;
        if (this.isValid()) {
            this.props.postGifForExercise(gif, exercise_name, muscle_group).then(res=>{
                    this.resetState();
                }
            ).catch(err=>errorResponse(err))
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
                    hasServerResponded: true
                })
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
        this.setState({isAddingNew: false, disableButton: false})
    };

    onCancelEdit() {
        this.resetState();
        this.setState({isEditing: false, disableButton: false})
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

                            <UploadFile onUpload={this.onUpload}/>

                            <ButtonOrange onClick={this.onSubmit} label="Update"/>
                            <ButtonOrange onClick={this.onCancelEdit} label="Cancel"/>
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

                        <div className={classnames('form-group', {'has-error': errors.gif})}>
                               <UploadFile onUpload={this.onUpload}/>
                            {errors.gif && <span className="help-block">{errors.gif}</span>}
                        </div>
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


export default connect(null,{postGifForExercise})(GifList);