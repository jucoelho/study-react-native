import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getPixelSize } from "../../Utils";
import Search from "../Search";
import Directions from "../Directions";
import markerImage from "../../assets/marker.png";
import {
    Back,
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall
  } from "./styles";

export default class Map extends Component {

    state = {
        region:null,
        destination:null,
         
    }
async componentDidMount(){
    
    navigator.geolocation.getCurrentPosition(
        ({coords:{latitude,longitude}}) => {
            this.setState({ 
                region:{
                    latitude,
                    longitude,
                    latitudeDelta:  0.005,
                    longitudeDelta: 0.005,
                }
            })
        }, //sucesso
        () =>{}, //erro
        {
            
            timeout:2000,
            enableHighAccuracy:true,
            maximumAge:1000,
        }

    )

}

    handleLocationSelected= (data,{geometry}) =>{
         const {location:{lat:latitude,lng:longitude}} = geometry

         this.setState({
             destination:{
                 latitude,
                 longitude,
                 title:data.structured_formatting.main_text,
             },
         })
    }
    render(){
        const {region,destination} = this.state;
        return(
        <View style={{flex:1}}> 
        <MapView
            style={{flex:1}}
            region={this.state.region}
            showsUserLocation
            loadingEnabled
            ref={el=>this.MapView = el}
        >
            {destination &&(
                <Fragment>
                <Directions 
                origin={region}
                destination ={destination}
                onReady= {result=>{
                    this.MapView.fitToCoordinates(result.coordinates,{
                        edgePadding:{
                            right:getPixelSize(50),
                            left:getPixelSize(50),
                            top:getPixelSize(50),
                            bottom:getPixelSize(50),
                        }
                    })
                }}
                />
                <Marker 
                    coordinate={destination} 
                    anchor={{ x:0, y:0}} 
                    image={markerImage}> 
                    
                </Marker>
                </Fragment>
            )}
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected}/>
        </View>
        );
    }
}



