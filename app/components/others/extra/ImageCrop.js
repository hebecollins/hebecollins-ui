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
        this.onChange = this.onChange.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpload = this.onUpload.bind(this)
    }

    onChange(crop) {
        this.setState({crop});
    };

    onSubmit() {
        const {crop, image} = this.state;

        const canvas = document.createElement('canvas');
        let imgSelected = document.getElementsByClassName('ReactCrop__crop-selection');
        let imgUncropped = document.getElementsByClassName('ReactCrop__image');
        let cs = getComputedStyle(imgSelected[0]);
        let uncroppedImageDimensions = getComputedStyle(imgUncropped[0]);

        console.log(crop);

        let width = parseInt(cs.getPropertyValue('width'));
        let height = parseInt(cs.getPropertyValue('height'));

        let widthUncropped = parseInt(uncroppedImageDimensions.getPropertyValue('width'));
        let heightuncropped = parseInt(uncroppedImageDimensions.getPropertyValue('height'));

        let x = widthUncropped * ((crop.x) / 100);
        let y = heightuncropped * ((crop.y) / 100);

        console.log(x);
        console.log(y);

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        let img = this.state.imageLoaded;
        // new Image();
        // img.src = image;

        ctx.drawImage(
            img,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        img.setAttribute('crossOrigin', 'anonymous');

        const base64Image = canvas.toDataURL('image/jpeg');

        this.setState({test: base64Image});
    }

    onUpload(img) {
        this.setState({image: img.preview, isImageUploaded: true});
    }


    onImageLoaded(image) {
        console.log("loaded");
        console.log(image);
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