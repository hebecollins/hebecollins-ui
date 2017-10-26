import React from 'react'
import SingleScreen from "../../dumb/commons/templates/SingleScreen";
import WorkoutGroup from "../../dumb/commons/inputFieldGroup/WorkoutGroup";

class AddWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            isLoading: "",
            week: [],
            dayName: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            index: 0
        };

        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);

    }

    onNext() {
        console.log(this.state.week);
        this.setState({index:this.state.index+1})
    }

    onPrevious() {
        this.setState({index:this.state.index-1})
    }

    render() {
        const {dayName, week, index} = this.state;
        const dayOfWeek = (i) => {
            if (i%7 < 0)
                return 7 + i%7;
            else
                return i%7;
        };

        return (
            <div className="content">
                <SingleScreen>

                    <h1 className="white-center">{dayName[dayOfWeek(index)]}</h1>

                    <WorkoutGroup
                        previousDay={dayName[dayOfWeek(index - 1)]} dayOfWeek={dayName[dayOfWeek(index)]}/>

                    <div className="pager">
                        <button onClick={this.onPrevious}
                                className="btn-hebecollins-black">{dayName[dayOfWeek(index - 1)]}
                        </button>
                        <button onClick={this.onNext}
                                className="btn-hebecollins-black">{dayName[dayOfWeek(index + 1)]}
                        </button>
                    </div>

                    <h1 className="white-center">{dayName[dayOfWeek(index)]}</h1>
                </SingleScreen>
            </div>
        )
    }
}

export default AddWorkout