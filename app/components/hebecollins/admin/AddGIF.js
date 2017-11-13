import React from 'react'
import {Loading} from "../../others/extra/Loading";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getCategoryList, getExercisesWithoutGif, postGifForExercise} from "../../../actions/adminActions/gifActions";
import {deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {Fade} from "../../others/extra/Animation";
import {connect} from 'react-redux'
import GifAddForm from "../../others/inputFieldGroup/admin/GifAddForm";

class AddGIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            categoryList: [],
            hasServerResponded: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
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


    onSubmit(exerciseName, muscleGroup, gif, index) {
        this.props.postGifForExercise(gif, exerciseName, muscleGroup).then((res) => {
                const newExerciseList = deepCloneArray(this.state.exerciseList);
                newExerciseList.splice(index, 1);
                this.setState({
                    exerciseList: newExerciseList,
                });
            }
        ).catch(err => errorResponse(err))
    }


    render() {
        const {exerciseList, categoryList} = this.state;

        const labelList = exerciseList.map((exercise, index) => {
                const {exercise_name, id} = exercise;
                return (
                    <GifAddForm
                        key={id}
                        exerciseName={exercise_name}
                        index={index}
                        categoryList={categoryList}
                        onSubmit={this.onSubmit}
                    />
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

export default connect(null, {postGifForExercise})(AddGIF);