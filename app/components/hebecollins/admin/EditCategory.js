import React from 'react'
import {IMG_URL_OF} from "../../../../config/imageUrl";
import Dropzone from "../../others/extra/Dropzone";

class EditCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            isEditing: false,
            hasServerResponded: false,
        };

        this.onUpload = this.onUpload.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUpload(img) {
        this.setState({img: img});
    }

    onCancel() {
        this.setState({isEditing: false})
    }

    onEdit() {
        this.setState({isEditing: true})
    }

    onSubmit() {

    }

    render() {
        const {isEditing} = this.state;
        const {muscleGroup} = this.props;

        return <div className="exercise-control">
            <div className="exercise-details">
                <label className="orange-header">{this.props.header}</label>
                {isEditing ?
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
                    </div> :
                    <div>
                        <div className="pull-right">
                            <a onClick={this.onEdit} className="edit-icon-link">
                                <span className="large-glyphicon glyphicon glyphicon-edit"/>
                            </a>
                        </div>
                        <div className="admin-icon-box">
                            <div className="exercise-icon">
                                <img src={`${IMG_URL_OF.EXERCISES}./default.png`}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}

EditCategory.propTypes = {
    muscleGroup: React.PropTypes.string.isRequired,
    header: React.PropTypes.string.isRequired,
};

export default EditCategory;