import React from 'react';
import {TwoScreen} from "../../dumb/commons/templates/TwoScreen";
import {FormatForm} from "../../dumb/commons/templates/FormatForm";
import {CommentBox, TextField} from "../../dumb/commons/InputFieldGroup";
import {postQuotesToReduxStore,postQuotesToServer} from "../../../actions/commons/quote"
import {connect} from 'react-redux'
import {validateQuotes} from "../../../Toolbox/Validation/helpers"
import {Monitor} from "./../../dumb/commons/templates/Monitor"

class AddQuotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: "",
            quote: "",
            errors: "",
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onAddMore = this.onAddMore.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    isValid() {
        const {errors, isValid} = validateQuotes(this.state);
        if (!isValid) {
            this.setState({errors})
        }
        return isValid;
    }

    onAddMore() {
        if (this.isValid()) {
            this.props.postQuotesToReduxStore(this.state);
            this.setState({
                author: "",
                quote: "",
                errors:"",
                isLoading: false
            });
            return true;
        }
        return false;
    }

    onSubmit() {
        if (this.isValid()) {
            this.props.postQuotesToReduxStore(this.state);
            this.props.postQuotesToServer(this.props.quotes);
        }
    }

    render() {
        const {errors, isLoading, author, quote} = this.state;
        return (
            <div className="content">
                <TwoScreen monitorMode={true}>
                    <div key="mobileVisible" className="white-box">
                        <FormatForm
                            instruction="Add Quotes dear ADMIN"
                            isLoading={isLoading}
                            iconClass=""
                            submitButton={false}>

                            <TextField
                                field="author"
                                value={author}
                                label="Author"
                                onChange={this.onChange}
                                error={errors.author}
                                isIconNeeded={false}
                            />

                            <CommentBox
                                field="quote"
                                value={quote}
                                label="Quote"
                                error={errors.quote}
                                onChange={this.onChange}
                                isIconNeeded={false}
                            />
                        </FormatForm>
                        <div className="pager">
                            <button
                                disabled={isLoading}
                                onClick={this.onAddMore} className="btn-next btn-lg">Add More
                            </button>
                            <button
                                disabled={isLoading}
                                onClick={this.onSubmit} className="btn-next btn-lg">Submit</button>
                        </div>
                    </div>
                    <div key="desktopOnly">
                        <Monitor data={this.props.quotes}/>
                    </div>
                </TwoScreen>
            </div>
        )
    }
}

AddQuotes.propTypes = {
    postQuotesToReduxStore: React.PropTypes.func.isRequired,
    postQuotesToServer: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        quotes: state.quotes
    }
}

export default connect(mapStateToProps, {postQuotesToReduxStore,postQuotesToServer})(AddQuotes);