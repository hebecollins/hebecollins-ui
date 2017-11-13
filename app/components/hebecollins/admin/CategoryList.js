import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {getCategoryList, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {Fade} from "../../others/extra/Animation";
import {connect} from 'react-redux'
import {ButtonOrange} from "../../others/display/Buttons";
import {UploadFile} from "../../others/inputField/InputFieldWithIconAddOn";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            imgUrls: [],
            img: '',
            isEditing: false,
            hasServerResponded: false,
        };

        this.onUpload = this.onUpload.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
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
        this.setState({isEditing: false})
    }

    onEdit() {
        this.setState({isEditing: true})
    }

    render() {
        const {categoryList, isEditing} = this.state;

        const labelList = categoryList.map((muscleGroup, index) => {
                return (
                    <div className="exercise-control">
                        <div className="exercise-details">
                            <div className="orange-header">{muscleGroup}</div>
                            {isEditing ? <div className="pull-right">
                                    <ButtonOrange
                                        onClick={() => this.renderGif(index)}
                                        disabled={false}
                                        label={"Done"}/>
                                    <ButtonOrange
                                        onClick={this.onCancel}
                                        disabled={false}
                                        label={"Cancel"}/>
                                </div> :
                                <ButtonOrange
                                    onClick={this.onEdit}
                                    disabled={false}
                                    label={"edit"}/>

                            }
                        </div>
                    </div>
                );
            }
        );

        const uploadImg = <UploadFile onUpload={this.onUpload} field={"img"}/>

        return this.state.hasServerResponded ?
            <div className="content quote-box">
                <h1 className="white-center">Pending GIFs To Be Added</h1>
                <div className="workout-group">
                    <Fade>{labelList}</Fade>
                </div>
            </div> : <Loading/>
    }
}

export default connect(null, {postGifForExercise})(CategoryList);