import React from 'react';
import QuoteBox from "../../others/frames/QuoteBox";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class ClientHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li><button onClick={()=>redirectByName("GET_WORKOUT_FOR_TODAY")} className="btn-hebecollins-black">Get Workout</button></li>
                </QuoteBox>
            </div>
        )
    }
}

export default ClientHome;