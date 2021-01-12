<template>
  <div id="main-page">
    <Main>
        <div>
            <h2>My Tracks</h2>
            <table style="width:100%" id="trackList">
              <thead>
                <tr>
                  <th>Track ID</th>
                  <th>Start Position</th>
                  <th>End Position</th>
                  <th>Track Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="track in myTracks" v-bind:key="track.id">
                  <td>{{track.trackId}}</td>
                  <td>{{track.startCoord}}</td>
                  <td>{{track.endCoord}}</td>
                  <td>{{track.distance.toFixed(2)}} m</td>
                </tr>
              </tbody>
            </table>

        </div>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  components: {

  },
})
export default class App extends Vue {

  myTracks = [] as any;
  i = 0;

  created(): void{
    firebase.firestore().collection('MyTracks')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const len = doc.data().track.length;
            const startCoord = doc.data().track[0];
            const endCoord = doc.data().track[len-1];
            const distance = this.haversineDistance(startCoord , endCoord);
            const trackId = ++this.i;
            const myTrackObj = { 
              trackId,
              startCoord,
              endCoord,
              distance
            };
            this.myTracks.push(myTrackObj);
          });
        })
        .catch(function(error) {
            console.error("Error loading document: ", error);
        });

    console.log(this.myTracks);
    }
  
  haversineDistance(mk1: any, mk2: any): number {
      const R = 3958.8; // Radius of the Earth in miles
      const rlat1 = mk1.latitude * (Math.PI/180); // Convert degrees to radians
      const rlat2 = mk2.latitude * (Math.PI/180); // Convert degrees to radians
      const difflat = rlat2-rlat1; // Radian difference (latitudes)
      const difflon = (mk2.longitude-mk1.longitude) * (Math.PI/180); // Radian difference (longitudes)

      const d = 1.6*1000 *2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table, th, tr {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
  text-align: left;
}
#trackList tr:nth-child(even) {
  background-color: #eee;
}
#trackList tr:nth-child(odd) {
 background-color: #fff;
}
#trackList th {
  background-color: black;
  color: white;
}
</style>
