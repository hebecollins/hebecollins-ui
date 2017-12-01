import React from 'react'
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import {IMG_URL_OF} from "../../../../config/imageUrl";
import 'react-image-crop/dist/ReactCrop.css';
import {ButtonOrange} from "../display/Buttons";
import Dropzone from "./Dropzone";
import isEmpty from 'lodash/isEmpty'

export class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {},
            image: '',
            test: '',
            imageLoaded: '',
            isImageUploaded: false
        };
        this.onChange = this.onChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    onChange(crop) {
        this.setState({crop});
    };

    onSubmit() {
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


        this.urltoFile(base64Image, 'hello.jpg', 'image/jpg')
            .then(function (file) {
                console.log(file);
            })
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
        return <div className="content test">
            {
                this.state.isImageUploaded ?
                    <div>
                        <ReactCrop
                            src={this.state.image}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onChange={this.onChange}
                            keepSelection={true}
                        />

                        {!isEmpty(this.state.image) ? <img src={this.state.test}/> : <div/>}
                        <ButtonOrange onClick={this.onSubmit} label={"submit"}/>
                    </div> :
                    <Dropzone onUpload={this.onUpload} label={"upload image"}/>
            }
        </div>
    }
}