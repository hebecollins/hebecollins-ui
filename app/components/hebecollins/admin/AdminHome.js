import React from 'react';
import QuoteBox from "../../smart/commons/templates/QuoteBox";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class AdminHome extends React.Component {
    render() {
        return (
            <div>
                <QuoteBox>
                    <li>
                        <button
                            className="btn-hebecollins-black"
                            onClick={() => redirectByName("ADD_QUOTES")}>
                            Add Quotes
                        </button>
                    </li>
                </QuoteBox>
            </div>
        )
    }
}

export default AdminHome;