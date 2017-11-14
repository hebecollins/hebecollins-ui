import React from 'react'
import Dropzone from "../../extra/Dropzone";
import {BASE_URL} from "../../../../../config/baseURL";
import {BACKEND_ROUTES} from "../../../../../config/backendRoutes";
import {errorResponse} from "../../../../Toolbox/Helpers/responseHandler";


/**Represents a single category card
 * */
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
        const {img} = this.state;
        const {muscleGroup, updateMuscleGroupOnServer} = this.props;
        updateMuscleGroupOnServer(img, muscleGroup).then(res => {
            this.setState({isEditing:false});
        }).catch(err=>errorResponse(err))
    }

    render() {
        const {isEditing} = this.state;
        const {muscleGroupId} = this.props;

        const editForm =
            <div>
                {/*gives a cancel button-icon*/}
                <div className="pull-right">
                    <a onClick={this.onCancel} className="edit-icon-link">
                        <span className="large-glyphicon glyphicon glyphicon-remove-circle"/>
                    </a>
                </div>

                {/*gives a ok button-icon*/}
                <div className="pull-right">
                    {this.state.img ?
                        <a onClick={this.onSubmit} className="edit-icon-link">
                            <span className="large-glyphicon glyphicon glyphicon-ok-circle"/>
                        </a> : <div/>}
                </div>

                {/*gives a Dropzone to upload file*/}
                <div className="admin-icon-box">
                    <div className="exercise-icon">
                        <Dropzone onUpload={this.onUpload} label="Drag and drop or Click on the box to upload"/>
                    </div>
                </div>
            </div>;


        const exerciseIconCard =
            <div>
                {/*gives a edit button-icon to edit the image*/}
                <div className="pull-right">
                    <a onClick={this.onEdit} className="edit-icon-link">
                        <span className="large-glyphicon glyphicon glyphicon-edit"/>
                    </a>
                </div>

                {/*gives a muscle group icon*/}
                <div className="admin-icon-box">
                    <div className="exercise-icon">
                        <img src={this.state.img ? this.state.img.preview:
                            `${BASE_URL}${BACKEND_ROUTES.COMMONS.GET_MUSCLE_GROUP_ICON}/${muscleGroupId}`}/>
                    </div>
                </div>
            </div>;


        return <div className="exercise-control">
            <div className="exercise-details">
                <label className="orange-header">{this.props.muscleGroup.toUpperCase()}</label>
                {isEditing ? editForm : exerciseIconCard}
            </div>
        </div>
    }
}

EditCategory.propTypes = {
    muscleGroupId: React.PropTypes.string.isRequired,
    muscleGroup: React.PropTypes.string.isRequired,
    updateMuscleGroupOnServer: React.PropTypes.func.isRequired,
};

export default EditCategory;