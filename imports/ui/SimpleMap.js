import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, Autocomplete } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBcAEpt9OL47QHZZAT9KhpBKnbCDkUyH9U");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

Geocode.setLocationType("ROOFTOP");



const AnyReactComponent = ({ text }) => <div className="triangle-down"></div>


export class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: (this.props.lat) ? this.props.lat : 24.61306722242063,
        lng : (this.props.lng) ? this.props.lng: 46.612601136915934
      },
      zoom: 15,
      city : []

    }
}
 setLocationPin(e){
  let city, state, country;

  Geocode.fromLatLng(e.lat, e.lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;

            case "country":
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      console.log("56==",city );
        this.setState({
          center: {
            lat: e.lat,
            lng:e.lng,
            
          },
          city : [city]
        } , (err)=>{
          if (err) {
            console.log(err);
          } else {
            this.props.sendData(this.state)
          }
        }) 

      

    },
     (error) => {
      console.error(error);
      swal(
        {
          title: 'حدث خطا',
          text: "حرك مؤشر الموقع قلبل",
          type: 'warning',
              },
        function (isConfirm) {
          if (isConfirm) {
            // FlowRouter.go ('bookingMultiple');
          } else {
          }
        }
      );
    }
  );


}


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB26LsBjwYe57N5r5K7Cuno288cIhkoAZQ"}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={(e)=>this.setLocationPin(e)}
        >
          <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

// export class SimpleMap  extends Component {
//   constructor (props) {
//     super(props)

//     this.autocomplete = null

//     this.onLoad = this.onLoad.bind(this)
//     this.onPlaceChanged = this.onPlaceChanged.bind(this)

//     this.state = {
//       currentLocation: {lat: 0, lng: 0},
//       markers: [],
//       zoom: 8
//     }
//   }
  

//   componentDidMount() {
//     navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
//       const pos = {lat, lng}
//       this.setState({currentLocation: pos})  
//     })
//   }

//   onLoad (autocomplete) {
//     console.log('autocomplete: ', autocomplete)

//     this.autocomplete = autocomplete
//   }


//   onPlaceChanged() {
//     if (this.autocomplete !== null) {
//       let lat = this.autocomplete.getPlace().geometry.location.lat()
//       let long = this.autocomplete.getPlace().geometry.location.lat()
//     } else {
//       console.log('Autocomplete is not loaded yet!')
//     }
//   }

//   render() {
//     return (
//       <LoadScript
//         googleMapsApiKey="AIzaSyCAOnNDfeA7T9gaFY2NJSd6VLDQ6jl9US8"
//         libraries={["places"]}
//       >
//         <GoogleMap
//           id='search-box-example'
//           mapContainerStyle={containerStyle}
//           center={this.state.currentLocation}
//           zoom={14}
//           // onDragEnd={search for centers in current location}
//         >
//           <Marker key={1} position={this.state.currentLocation} />
//           <Autocomplete
//             onLoad={this.onLoad}
//             onPlaceChanged={this.onPlaceChanged}
//           >
//             <input
//               type="text"
//               placeholder="Customized your placeholder"
//               style={inputStyles}
//             />
//           </Autocomplete>
//         </GoogleMap>
//       </LoadScript>
//     );
//   }
// }

