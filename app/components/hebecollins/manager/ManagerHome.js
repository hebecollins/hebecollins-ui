import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

/** Takes random quotes from Db and display here along with add trainer button
 * */
class ManagerHome extends React.Component {

    render() {
        return (
            <div>
                <QuoteBox>
                    <li>
                        <button
                            className="btn-hebecollins-black"
                            onClick={() => redirectByName("ADD_TRAINER")}
                        >Add Trainer
                        </button>
                    </li>
                    <li>
                        <button
                            className="btn-hebecollins-black"
                        >Add Gym
                        </button>
                    </li>
                </QuoteBox>
            </div>
        )
    }
}

export default ManagerHome;