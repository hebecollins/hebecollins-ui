import React from 'react'
import {CommentBox, TextField} from "../inputField/InputFieldWithIconAddOn";
import Rate from "../extra/Rate";
import {ButtonOrange} from "../display/Buttons";
import {getTrainerReviews} from "../../../actions/ratingActions";

class DisplayReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overallRating:[],
            individualRating:[]
        };
    }

    componentWillMount(){
        getTrainerReviews('59eeef3689aa8','59e380f606358').then(res=>{

        })
    }

    render() {
                return <div>hello</div>
            }
}

export default DisplayReviews;