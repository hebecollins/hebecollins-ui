import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {getCategoryList, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {connect} from 'react-redux'
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            imgUrls: [],
            img: '',
            isAdding: false,
            hasServerResponded: false,
        };

        this.onUpload = this.onUpload.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onAdding = this.onAdding.bind(this);
    }

    /**sends request for gif list, if success response comes, it sends another request for category list
     * to get the muscle_group entries
     */
    componentWillMount() {
        getCategoryList().then(res => {
                this.setState({categoryList: res.data, hasServerResponded: true})
                //get all the PNGs from local
            }
        ).catch(err => console.log("in errooro"))
    }


    onUpload(e) {
        const img = e.target.files[0];//
        this.setState({img: img});
    }

    onCancel() {
        this.setState({isAdding: false})
    }

    onAdding() {
        this.setState({isAdding: true})
    }

    render() {
        const {categoryList} = this.state;

        const categoryFormList = categoryList.map((muscleGroup, index) => {
                return (
                    <EditCategory
                        key={index}
                        muscleGroup={muscleGroup}
                        header={muscleGroup.toUpperCase()}
                    />
                );
            }
        );

        const addNew =
                <AddCategory
                    header="Adding a new muscle group category"
                    onCancel={this.onCancel}
                />

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

export default connect(null, {postGifForExercise})(CategoryList);