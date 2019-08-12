<template>
    <div id=app>
    </div>
</template>

<script>
import  'leaflet/dist/leaflet.css'
import  L from 'leaflet'

export default {
    mounted() {
        const map = L.map( 'app', {
             center: L.latLng( 35.6825, 139.752778 ),
             zoom: 15
            }).addLayer(L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' )
        )
        L.marker( [35.6825, 139.752778] ).addTo( map )
        .bindPopup( 'A pretty CSS3 popup.<br> Easily customizable.' )
        .openPopup()
    }
}
</script>

<style>
html, body, #app { height: 100% }
body { margin: 0 }
</style>