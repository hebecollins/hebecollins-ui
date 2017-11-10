import React from 'react'
import {getCurrentWorkoutToRedux, getExerciseGifFromServer, getGifFromServer} from "../../../actions/workoutActions";
import {connect} from 'react-redux'
import {currentDayOfWeek, dayOfWeek, deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import isEmpty from 'lodash/isEmpty'
import {IconButtons} from "../../others/display/Buttons";

class GetCurrentWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayWorkout: [],
            index: 0,
            hasServerResponded: false,
            displayGif: false,
            exerciseNameId:'',
            exerciseName:'',
            img:''
        };
        this.getWorkout = this.getWorkout.bind(this)
        this.renderGif = this.renderGif.bind(this)
    }

    componentWillMount() {
        const {gymId, getCurrentWorkoutToRedux} = this.props;
        getCurrentWorkoutToRedux(gymId).then((res) => {
            this.setState({index: currentDayOfWeek(), hasServerResponded: true});
            this.getWorkout()

        }).catch(err => {
            this.setState({hasServerResponded: true});
            errorResponse(err)
        })
    }

    componentDidUpdate() {
        if (this.state.displayGif) {
            let el = document.getElementById('pop-on-screen');
            el.addEventListener('click', () => {
                el.removeEventListener('click', () => {
                });
                this.setState({displayGif: false}
                )
            });
        }
    }

    getWorkout() {
        const workout = deepCloneArray(this.props.workout);
        const currentDay = dayOfWeek(this.state.index);
        this.setState({dayWorkout: workout["wed"]})
    }

    renderGif(exerciseNameId, exerciseName) {
         getExerciseGifFromServer("59b97c961b5cf").then(res=>
             this.setState({
                 displayGif: true,
                 exerciseNameId:exerciseNameId,
                 exerciseName:exerciseName,
                 img:res.data
             })
         );
    }


    render() {
        const {dayWorkout} = this.state;

        const gifContainer =
            <div id="pop-on-screen">
                <div id="gif-container">
                    <div className="white-center">{this.state.exerciseName}</div>
                    <img id="gif" src={this.state.img}/>
                </div>
            </div>;


        const renderWorkout = dayWorkout.map((exercise, i) => {
            const {exercise_name_id, exercise_name, sets, reps, rest} = exercise;
            return <div key={i} className="exercise-control">
                <span className="badge exercise-badge">{i + 1}</span>
                <div className="exercise-details flex">
                    <div className="exercise-text">
                        <div className="orange-header">{exercise_name}</div>
                        <div className="exercise-body">
                            <div>
                                <div>
                                    <label className="field">Sets :</label>
                                    <label className="light-orange value">{sets}</label>
                                </div>
                                <div>
                                    <label className="field">Reps :</label>
                                    <label className="light-orange value">
                                        {Object.keys(reps).map((key) => (
                                            <label key={key} className="light-orange value">
                                                {reps[key]}
                                            </label>
                                        ))}
                                    </label>
                                </div>
                                <div>
                                    <label className="field">Rest :</label>
                                    <label className="light-orange value">{rest} seconds</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exercise-icons">
                        <div className="exercise-icon">
                            <img src={require('./../../../../images/machine_icon.png')}/>
                        </div>
                        <div className="bottom right">
                            <button className="btn-icon"
                                    onClick={() => this.renderGif(exercise_name_id, exercise_name)}>
                                <span className="glyphicon glyphicon-facetime-video"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        });

        const renderRest = <div><h1 className="white-center">Today is you rest day</h1></div>

        return (
            <div className="quote-box content">
                <h1 className="white-center">Today's Workout</h1>
                <div className="horizontal-padding">
                    <div className="workout-group">
                        {/*if day's workout is empty then it will show as rest day*/}
                        {!isEmpty(dayWorkout) ? renderWorkout : renderRest}
                    </div>
                </div>
                <div>{this.state.displayGif ?
                    gifContainer : <div/>}</div>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    gymId: state.selectedGym.gym_id,
    workout: state.workout.workout
});

const mapDispatchToProps = {
    getCurrentWorkoutToRedux
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCurrentWorkout);