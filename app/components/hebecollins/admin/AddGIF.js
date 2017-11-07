import React from 'react'
import SingleScreen2 from "../../others/frames/SingleScreen2";
import {Loading} from "../../others/extra/Loading";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getExerciseListForGif, postGifForExercise} from "../../../actions/gifActions";
import {deepCloneArray} from "../../../Toolbox/Helpers/extra";

class AddGIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [],
            hasServerResponded: false,
            gif: ''
        };

        this.onUpload = this.onUpload.bind(this);
    }


    componentWillMount() {
        getExerciseListForGif().then(
            (res) => {
                const exerciseList = res.data.exercise_list;
                this.setState({exerciseList: exerciseList, hasServerResponded: true});
            }
        )
    }


    /** gets workout from the server with same labelId, stores it in redux and then redirects
     * to assignWorkout page
     * @param exerciseName => exercise name
     * @param index => index no. in the array
     * @param e => event
     */
    onUpload(exerciseName, index, e) {
        const gif = e.target.files[0];
        this.setState({gif:gif});
        postGifForExercise(gif, exerciseName).then(
            (res) => {
                const newExerciseList = deepCloneArray(this.state.exerciseList)
                newExerciseList.splice(index, 1);
                this.setState({
                    exerciseList: newExerciseList
                })
            }
        ).catch(err => errorResponse(err))
    }

    render() {
        const {exerciseList} = this.state;
        const labelList = exerciseList.map((exercise, index) => {
                const {exercise_name, id} = exercise;
                return (

                    <div key={index}>
                        <div className="pager">
                            <div className="pull-left">
                                <label className="field">Exercise Name :</label>
                                <label className="value">{exercise_name}</label><br/>
                            </div>
                            <div className="pull-right">
                                <input className="upload"
                                       type="file" id="gif"
                                       onChange={(e) => this.onUpload(exercise_name, index, e)}
                                />
                            </div>
                        </div>
                        <hr/>
                    </div>
                );
            }
        );

        return this.state.hasServerResponded ?
            <div className="content">
                <SingleScreen2>
                    <h1 className="white-center">Pending GIFs To Be Added</h1>
                    {labelList}
                </SingleScreen2>
            </div> :
            <Loading/>

    }
}


export default AddGIF;