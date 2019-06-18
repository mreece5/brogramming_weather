import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import { weatherConditions } from '../../../utils/WeatherConditions';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RoadConditionsComponent from '../component1/roadcomponents/RoadConditionsComponent';



export default class CurrentWeatherComponent extends React.Component{

  static propTypes = {
    weather: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  render(){

    const weather = this.props.weather;
    const temperature = this.props.temperature;
    const sunrise = this.props.sunrise;
    const sunset = this.props.sunset;
    const current = this.props.current;


    var sunriseDate = new Date(sunrise * 1000);
    var formattedSunrise = ('0' + sunriseDate.getHours()).slice(-2) + ':' + ('0' + sunriseDate.getMinutes()).slice(-2);
    console.log("HOURS: " + sunriseDate.getHours());

    var sunsetDate = new Date(sunset * 1000);
    var formattedSunset = ('0' + sunsetDate.getHours()).slice(-2) + ':' + ('0' + sunsetDate.getMinutes()).slice(-2);

    var currentDate = new Date(current * 1000);
    var formmatedCurrent = ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2);
 

    function handleSunStatus(currentDate, sunriseDate, sunsetDate) {
      var status;
      if(currentDate.getHours() > sunriseDate.getHours() || (currentDate.getHours() == sunriseDate.getHours()  && currentDate.getMinutes() > sunriseDate.getMinutes())){
        status = true;
      }else if(currentDate.getHours() > sunsetDate.getHours() || (currentDate.getHours() == sunriseDate.getHours()  && currentDate.getMinutes() > sunriseDate.getMinutes())){
        status = false;
      }else if(currentDate.getHours() < sunsetDate || (currentDate.getHours() == sunriseDate.getHours()  && currentDate.getMinutes() > sunsetDate.getMinutes()) || currentDate.getHours() < sunriseDate.getHours() || (currentDate.getHours() == sunriseDate.getHours()  && currentDate.getMinutes() < sunriseDate.getMinutes()) ){
        status = false;
      }
      return status;
    }




    return (
        <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
      >
       <View>
      <RoadConditionsComponent style={styles.bodyContainer}/>
      </View>
      <View style={styles.headerContainer}>
      {handleSunStatus(currentDate, sunriseDate, sunsetDate) ?   
      <MaterialCommunityIcons
            size={72}
            name="brightness-5"
            color={'#fff'}
          />:  <MaterialCommunityIcons
          size={72}
          name="brightness-3"
          color={'#fff'}
        />}
        <View>
        <Text style={styles.sunrisetext}>{formmatedCurrent}</Text>
        </View>
      </View>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
      );
};

}

const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      backgroundColor: '#f7b733'
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 70
    },
    tempText: {
      fontSize: 48,
      color: '#fff'
    },
    sunrisetext: {
      fontSize: 20,
      color: '#fff'
    },
    sunsettext: {
      fontSize: 20,
      color: '#fff'
    },
    currenttext: {
      fontSize: 20,
      color: '#fff'
    },
    bodyContainer: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      paddingLeft: 25,
      marginBottom: 40
    },
    title: {
      fontSize: 48,
      color: '#fff'
    },
    subtitle: {
      fontSize: 24,
      color: '#fff'
    }
  });
  

AppRegistry.registerComponent('CurrentWeatherComponent', () => CurrentWeatherComponent);