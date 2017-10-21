import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";

class AdminHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li><button className="btn-hebecollins-black">Add Quotes</button></li>
                </QuoteBox>
            </div>
        )
    }
}

export default AdminHome;