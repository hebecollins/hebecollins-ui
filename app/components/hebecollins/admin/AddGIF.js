import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getExercisesWithoutGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {Select, TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {ButtonOrange} from "../../others/display/Buttons";
import {addFlashMessage} from "../../../actions/actionStore";
import {Fade} from "../../others/extra/Animation";


class AddGIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            hasServerResponded: false,
            gif: '',
            muscleGroup: ''
        };

        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentWillMount() {
        getExercisesWithoutGif().then(
            (res) => {
                const exerciseList = res.data.exercise_list;
                this.setState({exerciseList: exerciseList, hasServerResponded: true});
            }
        )
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    /** gets workout from the server with same labelId, stores it in redux and then redirects
     * to assignWorkout page
     * @param e => event
     */
    onUpload(e) {
        const gif = e.target.files[0];//
        this.setState({gif: gif});
    }

    /**
     * @param exerciseName => exercise name
     * @param index => index of the current array element
     */
    onSubmit(exerciseName, index) {
        postGifForExercise(this.state.gif, exerciseName, this.state.muscleGroup).then((res) => {
                const newExerciseList = deepCloneArray(this.state.exerciseList);
                newExerciseList.splice(index, 1);
                this.setState({
                    exerciseList: newExerciseList,
                    gif: ''
                });
                addFlashMessage({
                    type: "success",
                    text: res.data.msg
                })
            }
        ).catch(err => errorResponse(err))

    }

    render() {
        const {exerciseList} = this.state;
        const labelList = exerciseList.map((exercise, index) => {
                const {exercise_name, id} = exercise;
                return (
                    <div key={id} className="exercise-control">
                        <span className="badge exercise-badge">{index + 1}</span>
                        <div className="exercise-details">
                            <div className="orange-header">{exercise_name}</div>

                            <div className="page">
                                <Select
                                    field="category"
                                    value="category" label="select a category"
                                    onChange={this.onChange}
                                    isIconNeeded={false}
                                >
                                    <option value='chest'>Chest</option>
                                    <option value='bicep'>Bicep</option>
                                    <option value='tricep'>Tricep</option>
                                    <option value='back'>Back</option>
                                    <option value='legs'>Legs</option>
                                    <option value='abs'>Abs</option>
                                    <option value='shoulder'>Shoulder</option>
                                </Select>

                                <div className="upload-box flex">
                                    <input className="upload"
                                           type="file" id="gif"
                                           onChange={(e) => this.onUpload(e)}
                                    />
                                </div>
                                <ButtonOrange
                                    onClick={() => this.onSubmit(exercise_name, index)}
                                    disabled={false}
                                    label="Upload"/>

                            </div>
                        </div>
                    </div>
                );
            }
        );

        return this.state.hasServerResponded ?
            <div className="content quote-box">
                <h1 className="white-center">Pending GIFs To Be Added</h1>
                <div className="workout-group">
                    <Fade>{labelList}</Fade>
                </div>
            </div> :
            <Loading/>

    }
}


export default AddGIF;