import React from 'react'
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import {IMG_URL_OF} from "../../../../config/imageUrl";
import 'react-image-crop/dist/ReactCrop.css';
import {ButtonOrange} from "../display/Buttons";

export class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {},
            image: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(crop) {
        this.setState({crop});
    };

    onSubmit(){
        console.log(this.state.crop);
        console.log(this.state.image);
    }

    onComplete(crop, pixelCrop){
        console.log(crop);
        console.log(pixelCrop);
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        const image = this.state.image;
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

    }

    onImageLoaded(image) {
        this.setState({
            crop: makeAspectCrop({
                x: 10,
                y: 10,
                aspect: 1,
                width: 50,
            }, image.width / image.height)
            , image: image
        })
    }

    render() {
        return <div className="content test">
            <ReactCrop
                src={IMG_URL_OF.LOGO_SHORT} crop={this.state.crop}
                onImageLoaded={this.onImageLoaded}
                onChange={this.onChange}
                keepSelection={true}
                onComplete={this.onComplete}
            />
            <ButtonOrange onClick={this.onSubmit} label={"submit"}/>
        </div>
    }
}