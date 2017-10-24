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
    }

    onPrevious() {

    }

    render() {
        const {dayName, week, index} = this.state;
        const dayOfWeek = (i) => {
            if (i < 0)
                return 7 + i;
            else if (i > 6)
                return i - 7;
            else
                return i
        };
        return (
            <div className="content">
                <SingleScreen>
                    <WorkoutGroup week={week} dayOfWeek={dayName[dayOfWeek(index)]}/>

                    <div className="pager">
                        <button onClick={this.onNext}
                                className="btn-next btn-hebecollins">{dayName[dayOfWeek(index + 1)]}
                        </button>
                        <button onClick={this.onNext}
                                className="btn-next btn-hebecollins">{dayName[dayOfWeek(index - 1)]}
                        </button>
                    </div>
                </SingleScreen>
            </div>
        )
    }
}

export default AddWorkout