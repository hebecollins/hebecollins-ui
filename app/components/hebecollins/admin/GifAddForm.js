import React from 'react'
import {ButtonOrange} from "../../others/display/Buttons";
import {Select, UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateGifFormWithoutExercise} from "../../../Toolbox/Validation/helpers";

class GifAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            hasServerResponded: false,
            gif: '',
            muscle_group: '',
            errors: ''
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
        const {gif, muscle_group} = this.state;
        const {errors, isValid} = validateGifFormWithoutExercise(gif, muscle_group)
        if (!isValid) {
            this.setState({errors: errors})
        }
        return isValid
    }

    onSubmit(exerciseName, index){
        if(this.isValid()){
            const {gif, muscle_group} = this.state;
            this.props.onSubmit(exerciseName, muscle_group, gif, index)
        }
    }

    render() {
        const {index, exerciseName, categoryList} = this.props;
        const {errors} = this.state;
        return (
            <div className="exercise-control">
                <span className="badge exercise-badge">{index + 1}</span>
                <div className="exercise-details">
                    <div className="orange-header">{exerciseName}</div>

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
                        onClick={()=>this.onSubmit(exerciseName,index)}
                        disabled={false}
                        label="Upload"/>
                </div>
            </div>
        )

    }
}

GifAddForm.propTypes = {
    exerciseName: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    categoryList: React.PropTypes.array.isRequired,
    onSubmit: React.PropTypes.func.isRequired,

};

export default GifAddForm