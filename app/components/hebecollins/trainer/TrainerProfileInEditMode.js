import React from 'react'

class TrainerProfileInEditMode extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){

    }

    render(){
        return(
            <div className="content">
                <h1 className="white-center">Name</h1>
                <h1 className="white-center">Batch</h1>
                <h1 className="white-center">Age</h1>
                <h1 className="white-center">DOB</h1>
                <h1 className="white-center">Goal</h1>
                <h1 className="white-center">Goal Description</h1>
                <h1 className="white-center">Achievements</h1>
                <h1 className="white-center">Experience Level</h1>
                <h1 className="white-center">Height</h1>
                <h1 className="white-center">Weight</h1>
                <h1 className="white-center">BMI</h1>
                <h1 className="white-center">Waist</h1>
                <h1 className="white-center">Body fat</h1>
            </div>
        )
    }
}

export default TrainerProfileInEditMode;