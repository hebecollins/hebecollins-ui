import React from 'react'
import {validateGifForm, validateGifFormWithoutExercise} from "../../../../Toolbox/Validation/helpers";
import {Select, TextField, UploadFile} from "../../inputField/InputFieldWithIconAddOn";
import {ButtonOrange} from "../../display/Buttons";
import {errorResponse} from "../../../../Toolbox/Helpers/responseHandler";
import {scrollToError} from "../../../../Toolbox/Helpers/extra";

class ExerciseAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            hasServerResponded: false,
            gif: '',
            muscle_group: '',
            exercise_name: this.props.exerciseName,
            errors: '',
            isLoading: false
        };
        this.onUpload = this.onUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onUpload(e) {
        const gif = e.target.files[0];//
        this.setState({gif: gif});
    }


    isValid() {
        scrollToError();
        const {errors, isValid} = validateGifForm(this.state);
        if (!isValid) {
            this.setState({errors: errors})
        }
        return isValid
    }

    onSubmit() {
        const {exercise_name, muscle_group, gif} = this.state;
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.postGif(gif, exercise_name, muscle_group).then(res =>{
                    this.props.onCancel();
            }
            )
                .catch(err => {
                    const response = errorResponse(err);
                    if (response !== null) {
                        this.setState({errors: response, isLoading: false})
                    }
                }
            )
        }
    }

    render() {
        const {categoryList, header, editMode} = this.props;
        const {errors, exercise_name} = this.state;
        return (
            <div className="gif-form">
                    <div className="exercise-details">
                        <div className="orange-header">{header}</div>

                        {editMode ? <div/> :
                            <TextField
                                field="exercise_name"
                                onChange={this.onChange}
                                value={exercise_name}
                                label="Exercise Name"
                                isIconNeeded={false}
                                error={errors.exercise_name}/>
                        }

                        <Select
                            field="muscle_group"
                            label="Select the target muscle group"
                            isIconNeeded={false}
                            error={errors.muscle_group}
                            onChange={this.onChange}
                        >
                            {/*adds categoryList elements into option*/}
                            {
                                categoryList.map((category, index) => {
                                    return <option key={index} value={category}>{category.toUpperCase()}</option>
                                })
                            }
                        </Select>

                        <UploadFile onUpload={this.onUpload} field='gif' error={errors.gif}/>

                        <ButtonOrange
                            onClick={this.onSubmit}
                            disabled={false}
                            label="Upload"/>
                        <ButtonOrange
                            onClick={this.props.onCancel}
                            disabled={false}
                            label="Cancel"/>
                    </div>
                </div>
        )

    }
}

ExerciseAddForm.propTypes = {
    categoryList: React.PropTypes.array.isRequired,
    header: React.PropTypes.string.isRequired,
    exerciseName: React.PropTypes.string,
    onCancel: React.PropTypes.func,
    postGif : React.PropTypes.func,
    editMode: React.PropTypes.bool,
};

ExerciseAddForm.defaultProps = {
    exerciseName: '',
    editMode: true
};

export default ExerciseAddForm