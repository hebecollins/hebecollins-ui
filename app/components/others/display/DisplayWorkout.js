import React from 'react'
import {getCurrentWorkoutToRedux, getExerciseGifFromServer, getGifFromServer} from "../../../actions/workoutActions";
import {currentDayOfWeek, dayOfWeek, deepCloneArray} from "../../../Toolbox/Helpers/extra";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import isEmpty from 'lodash/isEmpty'
import {Loading} from "../../others/extra/Loading"
import {ExerciseGif, RenderExercise} from "../../others/display/RenderExercise";
import {DaySet} from "../../others/frames/DaySet";

class DisplayWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayWorkout: [],
            index: this.props.index,
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

    componentWillMount(){
        this.getWorkout();
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

        const gifContainer = <ExerciseGif exerciseName={exerciseName} gif={img}/>;

        const renderWorkout = dayWorkout.map((exercise, i) => {
            return <RenderExercise
                key={i}
                exercise={exercise}
                index={i}
                renderGif={this.renderGif}
            />
        });

        const renderRest = <div><h1 className="white-center">REST DAY!!!</h1></div>;

        const daySet = () => (<DaySet onDayChange={this.onDayChange} dayIndex={index}/>);

        return (
                <div>
                    {daySet()}
                    <div className="workout-group">
                        {/*if day's workout is empty then it will show as rest day*/}
                        {!isEmpty(dayWorkout) ? renderWorkout : renderRest}
                    </div>
                    {daySet()}
                <div>
                    {this.state.displayGif ? gifContainer : <div/>}
                </div>
            </div>
        )
    }
}


DisplayWorkout.propTypes = {
    gymId : React.PropTypes.string.isRequired,
    workout : React.PropTypes.object.isRequired,
    index : React.PropTypes.number.isRequired
};

export default DisplayWorkout;