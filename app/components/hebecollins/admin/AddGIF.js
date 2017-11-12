import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getCategoryList, getExercisesWithoutGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {Select, UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";
import {ButtonOrange} from "../../others/display/Buttons";
import {Fade} from "../../others/extra/Animation";
import {connect} from 'react-redux'
import {validateGifFormWithoutExercise} from "../../../Toolbox/Validation/helpers";


//TODO: validation + make each card an individual state
class AddGIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            categoryList: [],
            hasServerResponded: false,
            gif: '',
            muscle_group: '',
            errors: ''
        };

        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**sends request for gif list, if success response comes, it sends another request for category list
     * to get the muscle_group entries
     */
    componentWillMount() {
        getExercisesWithoutGif().then(
            (res) => {
                const exerciseList = res.data.exercise_list;
                this.setState({exerciseList: exerciseList, hasServerResponded: true});
                getCategoryList().then(res => {
                    this.setState({categoryList: res.data})
                })
            }
        ).catch(err => errorResponse(err))
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onUpload(e) {
        const gif = e.target.files[0];//
        this.setState({gif: gif});
    }

    isValid(index){
        const {gif, muscle_group} = this.state;
        const {errors,isValid} = validateGifFormWithoutExercise(gif[index], muscle_group[index])
        if(!isValid){
            let temp = deepCloneArray(this.state.errors);
            temp[index] = errors;
            this.setState({errors:temp})
        }
        return isValid
    }

    /**
     * @param exerciseName => exercise name
     * @param index => index of the current array element
     */
    onSubmit(exerciseName, index) {
        const {gif, muscle_group} = this.state;
        this.props.postGifForExercise(gif, exerciseName, muscle_group).then((res) => {
                const newExerciseList = deepCloneArray(this.state.exerciseList);
                newExerciseList.splice(index, 1);
                this.setState({
                    exerciseList: newExerciseList,
                    gif: '',
                    muscle_group:[]
                });
            }
        ).catch(err => errorResponse(err))
    }

    render() {
        const {exerciseList, categoryList} = this.state;

        const labelList = exerciseList.map((exercise, index) => {
                const {exercise_name, id} = exercise;
                return (
                    <div key={id} className="exercise-control">
                        <span className="badge exercise-badge">{index + 1}</span>
                        <div className="exercise-details">
                            <div className="orange-header">{exercise_name}</div>

                            <Select
                                field="muscle_group"
                                label="Select the target muscle group"
                                isIconNeeded={false}
                                onChange={this.onChange}
                            >
                                {/*adds categoryList elements into option*/}
                                {
                                    categoryList.map((category, index) => {
                                        return <option key={index} value={category}>{category.toUpperCase()}</option>
                                    })
                                }
                            </Select>

                           <UploadFile onUpload={this.onUpload} field='gif'/>

                            <ButtonOrange
                                onClick={() => this.onSubmit(exercise_name, index)}
                                disabled={false}
                                label="Upload"/>
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

export default connect(null,{postGifForExercise})(AddGIF);