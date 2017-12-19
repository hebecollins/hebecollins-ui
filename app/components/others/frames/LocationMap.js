import React from "react"
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: 18.9750, lng: 72.8258}}
    >
        {props.isMarkerShown && <Marker position={{lat: 18.9750, lng: 72.8258}} onClick={props.onMarkerClick}/>}
    </GoogleMap>
)

class MyFancyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
        }
        this.delayedShowMarker=this.delayedShowMarker.bind(this);
        this.handleMarkerClick=this.handleMarkerClick.bind(this);
    }


    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker(){
        setTimeout(() => {
            this.setState({isMarkerShown: true})
        }, 3000)
    }

    handleMarkerClick () {
        this.setState({isMarkerShown: false})
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

export default MyFancyComponent;