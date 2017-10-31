import React from 'react'
import {getQuote} from "../../../actions/quoteActions"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler"
import {connect} from 'react-redux';

/** It is frame for putting quotes on the home page. It has been made a smart component only
 *  because it will be used exactly without any modification & fields here will be common
 *  for all userTypes
 * */
class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            quote: '',
            author: ''
        }
    }

    componentWillMount() {
        this.setState({nickName: this.props.nickName});
        getQuote()
            .then(res => {
                    this.setState({author: res.data.author, quote: res.data.quote})
                }
            ).catch(err => {
            errorResponse(err);
        })
    }

    render() {
        const {nickName, quote, author} = this.state;
        return (
            <div className="quote-box content">
                <div className="row">
                    <div className="col col-lg-offset-2 col-lg-8  col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                        <h1 className="all-caps">Hello, {nickName}</h1>
                        <div className="quote">
                            <blockquote>{quote}<br/><p className="pull-right"> -{author}</p></blockquote>
                        </div>
                        <ul className="pager">
                            <h4>{this.props.children}</h4>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        nickName: state.auth.user.nick_name
    }
}

export default connect(mapStateToProps, null)(QuoteBox);
