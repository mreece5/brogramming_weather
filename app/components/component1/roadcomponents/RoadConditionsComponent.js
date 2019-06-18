import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import { API_KEY_ROAD } from '../../../../utils/WeatherAPIKey';



export default class RoadConditionsComponent extends React.Component{

       state = {
            incidents: [],
            severity: 0,
            error: null
        };

      componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // this.fetchTrafficIncidents(position.coords.latitude, position.coords.longitude, 41.23, 85.85);
            this.fetchTrafficIncidents(40.23, 86.85, 41.23, 85.85);
          },
          (error) => this.setState({
            error: 'Error Road Incidents'
            }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }

      fetchTrafficIncidents(latStart, longStart, latWarsaw, longWarsaw) {
        fetch(
          `http://www.mapquestapi.com/traffic/v2/incidents?key=${API_KEY_ROAD}&boundingBox=${latStart},${longStart},${latWarsaw},${longWarsaw}`
        )
          .then(res => res.text())
          .then(json => {
            console.log(json);
            this.setState({
              incidents: json.incidents,
              severity: json.severity,
            })
          });
      }

  render(){     
    console.log("severity!" + this.state.severity);
    console.log("incidents!" + this.state.incidents);
    return(
      <View>
        {this.state.severity == undefined || this.state.severity == 0 ? <Text style={styles.traffictext}>Clear Roads Ahead</Text>: <Text style={styles.traffictext}>Severity of Incident: {this.state.severity}</Text>}
        {this.state.incidents == undefined || this.state.incidents == "" ?  <Text style={styles.traffictext}>No Reported Incident{this.state.incidents}</Text> : <Text style={styles.traffictext}>Incidents Reported: {this.state.incidents}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  traffictext: {
    fontSize: 24,
    color: '#fff'
  }
});

AppRegistry.registerComponent('RoadConditionsComponent', () => RoadConditionsComponent);