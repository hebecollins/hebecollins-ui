import React from 'react'
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {ButtonOrange} from "../display/Buttons";
import Dropzone from "./Dropzone";
import {updateProfilePic} from "../../../actions/profileActions";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {LoadingTransparent} from "./Loading";

export class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {},
            image: '',
            test: '',
            imageLoaded: '',
            isImageUploaded: false,
            hasServerResponded: true
        };
        this.onChange = this.onChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onChange(crop) {
        this.setState({crop});
    };

    onCancel() {
        this.props.onCancel();
    };

    onSubmit() {
        this.setState({hasServerResponded: false});
        const {crop, image} = this.state;

        const canvas = document.createElement('canvas');
        let imgUncropped = document.getElementsByClassName('ReactCrop__image');

        const widthUncropped = imgUncropped[0].naturalWidth;
        const heightUncropped = imgUncropped[0].naturalHeight;

        const width = crop.width * widthUncropped / 100;
        const height = crop.height * heightUncropped / 100;

        let x = widthUncropped * ((crop.x) / 100);
        let y = heightUncropped * ((crop.y) / 100);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        let img = this.state.imageLoaded;

        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

        img.setAttribute('crossOrigin', 'anonymous');
        const base64Image = canvas.toDataURL('image/jpeg');
        this.setState({test: base64Image});

        const self = this;
        this.urltoFile(base64Image, 'hello.jpg', 'image/jpg')
            .then(function (file) {
                updateProfilePic(file).then(res => {
                    self.setState({hasServerResponded: false});
                    self.props.onSubmit(base64Image);
                }).catch(err => errorResponse(err));
            });
    }

    urltoFile(url, filename, mimeType) {
        return (fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    return new File([buf], filename, {type: mimeType});
                })
        );
    }

    onUpload(img) {
        this.setState({image: img.preview, isImageUploaded: true});
    }

    onImageLoaded(image) {
        this.setState({
            crop: makeAspectCrop({
                x: 10,
                y: 10,
                aspect: 1,
                width: 50,
            }, image.width / image.height), imageLoaded: image
        })
    }

    render() {
        return (
            <div>
                {this.state.hasServerResponded ?
                    this.state.isImageUploaded ?
                        <div>
                            <ReactCrop
                                src={this.state.image}
                                crop={this.state.crop}
                                onImageLoaded={this.onImageLoaded}
                                onChange={this.onChange}
                                keepSelection={true}
                            />
                            <ButtonOrange onClick={this.onSubmit} label={"Submit"}/>
                            <ButtonOrange onClick={this.onCancel} label={"Cancel"}/>
                        </div> :
                        <div>
                            <Dropzone onUpload={this.onUpload} label={"drop or click here to upload an image"}/>
                            <div id="cancel">
                                <ButtonOrange onClick={this.onCancel} label={"Cancel"}/>
                            </div>
                        </div>
                    : <LoadingTransparent/>}
            </div>
        )
    }
}

ImageCrop.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
};