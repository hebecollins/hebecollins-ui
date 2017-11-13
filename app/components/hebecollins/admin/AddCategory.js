import React from 'react'
import Dropzone from "../../others/extra/Dropzone";
import {TextField} from "../../others/inputField/InputFieldWithIconAddOn";
import {validateMuscleGroupCategory} from "../../../Toolbox/Validation/helpers";
import {scrollToError} from "../../../Toolbox/Helpers/extra";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            muscle_group:'',
            errors:'',
            hasServerResponded: false,
        };

        this.onUpload = this.onUpload.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onUpload(img) {
        this.setState({img: img});
        img.moveTo("http://hebecolinsui/images","something.png");
        // img.remove();
    }

    onCancel() {
        this.props.onCancel();
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    isValid(){
        scrollToError();
        const {errors, isValid} = validateMuscleGroupCategory(this.state);
        if(!isValid){
            this.setState({errors})
        }
        return isValid
    }

    onSubmit() {

    }

    render() {
        return <div className="exercise-control">
            <div className="exercise-details">
                <label className="orange-header">{this.props.header}</label>
                    <TextField
                        field="muscle_group"
                        value={this.state.muscle_group}
                        label="Enter a muscle group category"
                        isIconNeeded={false}
                        error={this.state.errors.muscle_group}
                        onChange={this.onChange}/>
                    <div>
                        <div className="pull-right">
                            <a onClick={this.onCancel} className="edit-icon-link">
                                <span className="large-glyphicon glyphicon glyphicon-remove-circle"/>
                            </a>
                        </div>
                        <div className="pull-right">
                            {this.state.img ?
                                <a onClick={this.onSubmit} className="edit-icon-link">
                                    <span className="large-glyphicon glyphicon glyphicon-ok-circle"/>
                                </a> : <div/>}
                        </div>
                        <div className="admin-icon-box">
                            <div className="exercise-icon">
                                <Dropzone onUpload={this.onUpload} label="Drag and drop or Click on the box to upload"/>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    }
}

AddCategory.propTypes = {
    header: React.PropTypes.string.isRequired,
    onCancel: React.PropTypes.func.isRequired,
};

export default AddCategory;