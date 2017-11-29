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
            isImageUploaded: false
        };
        this.onChange = this.onChange.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onComplete = this.onComplete.bind(this)
        this.onUpload = this.onUpload.bind(this)
    }

    onChange(crop) {
        this.setState({crop});
    };

    onSubmit() {
        const {crop, image} = this.state;

        console.log("crop");
        console.log(crop);
        console.log("image");
        console.log(image);

        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = this.state.image;

        ctx.drawImage(
            img,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
        );

        img.setAttribute('crossOrigin', 'anonymous');
        console.log(img);
        console.log(canvas);


        const base64Image = canvas.toDataURL('image/jpeg');

        this.setState({test: base64Image});

        console.log("base64Image");
        console.log(base64Image);
        console.log(ctx);
    }

    onComplete(crop, pixelCrop) {
        // console.log(crop);
        // console.log(pixelCrop);
        // const canvas = document.createElement('canvas');
        // canvas.width = pixelCrop.width;
        // canvas.height = pixelCrop.height;
        // const ctx = canvas.getContext('2d');
        //
        // const image = this.state.image;
        // ctx.drawImage(
        //     image,
        //     pixelCrop.x,
        //     pixelCrop.y,
        //     pixelCrop.width,
        //     pixelCrop.height,
        //     0,
        //     0,
        //     pixelCrop.width,
        //     pixelCrop.height
        // );
    }


    onUpload(img) {
        this.setState({image: img.preview, isImageUploaded:true});
        console.log(img)
    }


    onImageLoaded(image) {
        console.log(image);
        this.setState({
            crop: makeAspectCrop({
                x: 10,
                y: 10,
                aspect: 1,
                width: 50,
            }, image.width / image.height)
        })
    }

    render() {
        return <div className="content test">
            {this.state.isImageUploaded ?
                <div>
                    <ReactCrop
                        src={this.state.image}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onChange={this.onChange}
                        keepSelection={true}
                        onComplete={this.onComplete}
                    />

                    {!isEmpty(this.state.image) ? <img src={this.state.test}/> : <div/>}
                    <ButtonOrange onClick={this.onSubmit} label={"submit"}/>
                </div>:
            <Dropzone onUpload={this.onUpload} label={"upload image"}/>
            }

        </div>
    }
}