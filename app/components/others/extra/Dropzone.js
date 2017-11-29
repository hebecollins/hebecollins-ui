import React from 'react'
import ReactDropzone from 'react-dropzone'

//TODO: make it handle multiple files
class Dropzone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {preview: null};
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleDrop(file) {
        this.setState({preview: file[0].preview});
        this.props.onUpload(file[0]);
    }

    render() {
        const {preview} = this.state;

        return (
            <div>
                {!preview ?
                    <ReactDropzone
                        className="dropzone"
                        onDrop={this.handleDrop}
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        multiple={true}
                        onDropRejected={this.handleDropRejected}>
                        <label className="dropzone-label">{this.props.label}</label>
                    </ReactDropzone> :
                    <img src={preview} className="dropzone-img" alt="image preview"/>
                }
            </div>
        )
    }
}

Dropzone.propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
};

export default Dropzone;