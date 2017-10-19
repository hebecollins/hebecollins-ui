import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";

/** Takes random quotes from Db and display here along with add trainer button
 * */
class ManagerHome extends React.Component {

    render() {
        return (
            <div>
                <QuoteBox>
                    <li><button className="btn-hebecollins-black">Add Trainer</button></li>
                </QuoteBox>
            </div>
        )
    }
}

export default ManagerHome;