import React from 'react'
import {CommentBox, TextField} from "../inputField/InputFieldWithIconAddOn";
import Rate from "../extra/Rate";
import {ButtonOrange} from "../display/Buttons";

class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quality_one: 1,
            quality_two: 1,
            quality_three: 1,
            quality_four: 1,
            quality_five: 1,
            rating: 1,
            title: '',
            description: '',
            errors: ''
        };

        this.onChange = this.onChange.bind(this);
        this.qualityOne = this.qualityOne.bind(this);
        this.qualityTwo = this.qualityTwo.bind(this);
        this.qualityThree = this.qualityThree.bind(this);
        this.qualityFour = this.qualityFour.bind(this);
        this.qualityFive = this.qualityFive.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit() {
        this.props.onSubmit(this.state);
    }

    onCancel() {
        this.setState({
            quality_one: 1,
            quality_two: 1,
            quality_three: 1,
            quality_four: 1,
            quality_five: 1,
            rating: 1,
            title: '',
            description: '',
            errors: ''
        });
        this.props.onCancel();
    }

    qualityOne(rating) {
        this.setState({quality_one: rating});
    }

    qualityTwo(rating) {
        this.setState({quality_two: rating});
    }

    qualityThree(rating) {
        this.setState({quality_three: rating});
    }

    qualityFour(rating) {
        this.setState({quality_four: rating});
    }

    qualityFive(rating) {
        this.setState({quality_five: rating});
    }

    render() {
        let {quality_one, quality_two, quality_three, quality_four, quality_five} = this.state;
        const {qualityOne, qualityTwo, qualityThree, qualityFour, qualityFive} = this.props;
        return (
                <div className="add-review-box">
                    <div className="add-review">
                        <h1 className="orange-header no-bottom-padding">{this.props.header}</h1>
                        <hr/>
                        <div className="rating-group">
                            <div className="rating">
                                <label className="rating-label">{qualityOne}</label>
                                <div className="rating-stars">
                                    <Rate value={quality_one} onChange={this.qualityOne}/>
                                </div>
                            </div>
                            <div className="rating">
                                <label className="rating-label">{qualityTwo}</label>
                                <Rate value={quality_two} onChange={this.qualityTwo}/>
                            </div>
                            <div className="rating">
                                <label className="rating-label">{qualityThree}</label>
                                <Rate value={quality_three} onChange={this.qualityThree}/>
                            </div>
                            <div className="rating">
                                <label className="rating-label">{qualityFour}</label>
                                <Rate value={quality_four} onChange={this.qualityFour}/>
                            </div>
                            <div className="rating">
                                <label className="rating-label">{qualityFive}</label>
                                <Rate value={quality_five} onChange={this.qualityFive}/>
                            </div>
                        </div>

                        <div className="rating-text">
                            <TextField
                                field="title"
                                value={this.state.title}
                                label="Title (Optional)"
                                isIconNeeded={false}
                                onChange={this.onChange}
                            />
                            <CommentBox
                                field="description"
                                value={this.state.description}
                                label={"Description (Optional)"}
                                isIconNeeded={false}
                                onChange={this.onChange}
                            />
                            <ButtonOrange
                                onClick={this.onSubmit}
                                label={"Publish Review"}
                            />
                            <ButtonOrange
                                onClick={this.onCancel}
                                label={"Cancel"}
                            />
                        </div>
                    </div>
                </div>
        )
    }
}

RatingForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    header:React.PropTypes.string.isRequired,
    qualityOne:React.PropTypes.string.isRequired,
    qualityTwo:React.PropTypes.string.isRequired,
    qualityThree:React.PropTypes.string.isRequired,
    qualityFour:React.PropTypes.string.isRequired,
    qualityFive:React.PropTypes.string.isRequired,
};

RatingForm.defaultProps={
    qualityOne:'Quality One',
    qualityTwo:'Quality Two',
    qualityThree:'Quality Three',
    qualityFour:'Quality Four',
    qualityFive:'Quality Five',
};

export default RatingForm;