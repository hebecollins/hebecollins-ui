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
            image: '',
            test:''
        };
        this.onChange = this.onChange.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onComplete = this.onComplete.bind(this)
    }

    onChange(crop) {
        this.setState({crop});
    };

    onSubmit(){
        const {crop
            , image
        } = this.state;

        console.log("crop");
        console.log(crop);
        console.log("image");
        console.log(image);

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        // var image = new Image(this.state.image);

        ctx.drawImage(
            image,
            // crop.x,
            // crop.y,
            // crop.width,
            // crop.height,
            0,
            0,
            // crop.width,
            // crop.height
        );

        image.setAttribute('crossOrigin', 'anonymous');

        // const base64Image = canvas.toDataURL('image/png');

        // this.setState({test:base64Image});

        // console.log(base64Image);
        console.log(ctx);
        console.log(canvas);
        // console.log(this.state.image);
    }

    onComplete(crop, pixelCrop){
        // console.log(crop);
        // console.log(pixelCrop);
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

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

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

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');

        console.log(base64Image);
        console.log("hrelllllo");
        // // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(file => {
        //         file.name = fileName;
        //         resolve(file);
        //     }, 'image/jpeg');
        // });
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
                getCroppedImg={this.getCroppedImg}
            />
            {this.state.test? <img src={this.state.test}/>:<div/>}
            <ButtonOrange onClick={this.onSubmit} label={"submit"}/>
        </div>
    }
}