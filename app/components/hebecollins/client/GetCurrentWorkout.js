import React from 'react'
import {getCurrentWorkoutToRedux, getExerciseGifFromServer, getGifFromServer} from "../../../actions/workoutActions";
import {connect} from 'react-redux'
import {currentDayOfWeek, dayOfWeek, deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import isEmpty from 'lodash/isEmpty'
import {Loading} from "../../others/extra/Loading"
import {ExerciseGif, RenderExercise} from "../../others/display/RenderExercise";
import {DaySet} from "../../others/frames/DaySet";

class GetCurrentWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayWorkout: [],
            index: 0,
            hasServerResponded: false,
            displayGif: false,
            exerciseNameId: '',
            exerciseName: '',
            img: '',
        };
        this.getWorkout = this.getWorkout.bind(this);
        this.renderGif = this.renderGif.bind(this);
        this.onDayChange = this.onDayChange.bind(this)
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

    onDayChange(e) {
        const newDayIndex = (e.target.name === "next") ? ( this.state.index + 1 ) : (this.state.index - 1);
        this.setState({index: newDayIndex});
        this.getWorkout();
    }

    getWorkout() {
       //making it wait until previous state updates
        setTimeout(() => {
                const workout = deepCloneArray(this.props.workout);
                const currentDay = dayOfWeek(this.state.index);
                this.setState({dayWorkout: workout[currentDay]})
            }, 0
        )
    }

    renderGif(exerciseNameId, exerciseName) {
        this.setState({hasServerResponded: false});
        getExerciseGifFromServer(exerciseNameId).then(res =>
            this.setState({
                displayGif: true,
                exerciseNameId: exerciseNameId,
                exerciseName: exerciseName,
                img: res.data,
                hasServerResponded: true
            })
        );
    }


    render() {
        const {dayWorkout, index, exerciseName, img} = this.state;

        const gifContainer = <ExerciseGif exerciseName={exerciseName} gif={img}/>

        const renderWorkout = dayWorkout.map((exercise, i) => {
            return <RenderExercise
                key={i}
                exercise={exercise}
                index={i}
                renderGif={this.renderGif}
            />
        });

        const renderRest = <div><h1 className="white-center">Today is you rest day</h1></div>


        const daySet = () => (<DaySet onDayChange={this.onDayChange} dayIndex={index}/>)

        return (
            this.state.hasServerResponded ? <div className="quote-box content">
                <div className="horizontal-padding">
                    {daySet()}
                    <div className="workout-group">
                        {/*if day's workout is empty then it will show as rest day*/}
                        {!isEmpty(dayWorkout) ? renderWorkout : renderRest}
                    </div>
                    {daySet()}
                </div>
                <div>
                    {this.state.displayGif ? gifContainer : <div/>}
                </div>
            </div> : <Loading/>
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