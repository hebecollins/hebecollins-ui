import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {getMuscleGroupVerboseList,addMuscleGroupOnServer,updateMuscleGroupOnServer} from "../../../actions/adminActions/muscleGroupActions";
import {connect} from 'react-redux'
import EditCategory from "../../others/inputFieldGroup/admin/EditCategory";
import AddCategory from "../../others/inputFieldGroup/admin/AddCategory";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            muscleGroupListVerbose: [],
            img: '',
            isAdding: false,
            hasServerResponded: false,
        };

        this.onCancel = this.onCancel.bind(this);
        this.onAdding = this.onAdding.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    /**sends request for gif list, if success response comes, it sends another request for category list
     * to get the muscle_group entries
     */
    componentWillMount() {
        getMuscleGroupVerboseList().then(res => {
                const muscleGroupList = res.data.muscle_group_list;
                this.setState({
                    muscleGroupListVerbose: muscleGroupList,
                    hasServerResponded: true})
            }
        ).catch(err => errorResponse(err))
    }

    onCancel() {
        this.setState({isAdding: false});
    }

    refresh(){
        this.componentWillMount();
        this.setState({isAdding: false});
    }

    onAdding() {
        this.setState({isAdding: true})
    }

    render() {
        const { muscleGroupListVerbose} = this.state;

        const categoryFormList = muscleGroupListVerbose.map((x, index) => {
                return (
                    <EditCategory
                        key={index}
                        muscleGroupId={x.id}
                        muscleGroup={x.muscle_group}
                        updateMuscleGroupOnServer={this.props.updateMuscleGroupOnServer}
                    />
                );
            }
        );

        const addNew =
                <AddCategory
                    header="Adding a new muscle group category"
                    refresh={this.refresh}
                    addMuscleGroupOnServer={this.props.addMuscleGroupOnServer}
                />;

        return this.state.hasServerResponded ?
            <div className="content quote-box">
                <a onClick={this.onAdding} className="edit-icon-link top-right">
                    <span className="glyphicon glyphicon-plus"/> Add New
                </a>

                <h1 className="white-center">Existing Muscle Group Category Icons</h1>
                <div className="workout-group">
                    {this.state.isAdding ? addNew : <div/>}
                    {categoryFormList}
                </div>
            </div> : <Loading/>
    }
}

const mapDispatchToProps = {
    addMuscleGroupOnServer,
    updateMuscleGroupOnServer
};

export default connect(null, mapDispatchToProps)(CategoryList);