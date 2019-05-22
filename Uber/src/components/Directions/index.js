import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({destination,origin,onReady })=> 
<MapViewDirections 

    destination={destination}
    origin ={origin}
    onReady={onReady}
    apikey="AIzaSyCQfN-l27K-HWoG27piqAGKPfkVLTJy1Q4"
    strokeWidth={3}
    strokeColor="#222"

/>

export default Directions
