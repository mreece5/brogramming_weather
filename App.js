/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, Animated} from 'react-native';
import Component1 from './app/components/component1/Component1'
import { API_KEY } from './utils/WeatherAPIKey';
import CurrentWeatherComponent from './app/components/weathercomponents/CurrentWeatherComponent';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class brogramming_weather extends Component {

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => this.setState({
        error: 'Error Getting Weather Condtions'
        }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  fetchWeather(lat, long) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        })
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature} = this.state;

    console.log("WEATHER CONDITION!" + weatherCondition);
    console.log("TEMPERATURE!" + weatherCondition);
    return (
      <View style={styles.container}>
      {isLoading ? <Text>Fetching The Weather...</Text> : <CurrentWeatherComponent weather={weatherCondition} temperature={temperature} />}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

AppRegistry.registerComponent('brogramming_weather', () => brogramming_weather);
