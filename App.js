/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, TextInput, View, Animated, Image} from 'react-native';
import Component1 from './app/components/component1/Component1'
import { API_KEY } from './utils/WeatherAPIKey';
import CurrentWeatherComponent from './app/components/weathercomponents/CurrentWeatherComponent';
import BottomNavigation, { IconTab, Badge} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class brogramming_weather extends Component {
  

  tabs = [
    {
      key: 'Home',
      icon: 'weather-sunny',
      label: 'Home',
      barColor: '#085E95',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Info',
      icon: 'weather-lightning',
      label: 'Info',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    sunrise: 0,
    sunset:0,
    current: 0,
    error: null,
    activeTab: this.tabs[0].key,
    isHome: true,
    isInfo: false

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
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          current: json.dt,
          isLoading: false
        })
      });
  }

  fetchWeatherByCity(cityName) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          current: json.dt,
          isLoading: false
        })
      });
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <IconTab
    isActive={isActive}
    showBadge={tab.key === 'Home'}
    renderBadge={() => <Badge>hello</Badge>}
    key={tab.key}
    label={tab.label}
    renderIcon={this.renderIcon(tab.icon)}
  />
  )

  handleOnPress(newTab){
    var home = false;
    var info = false;
    if(newTab.key === "Home"){
      home = true;
      info = false;
    }
    else{
      home = false;
      info = true;
    }
    this.setState({ 
      activeTab: newTab.key,
      isHome: home,
      isInfo: info
    });
  }
  
 

  render() {
    const { isLoading, weatherCondition, temperature, sunrise, sunset, current, isHome, isInfo} = this.state;

    console.log("WEATHER CONDITION!" + weatherCondition);
    console.log("TEMPERATURE!" + temperature);
    console.log("sunrise!" + sunrise);
    console.log("sunset!" + sunset);
    console.log("current!" + current);
    let viewTOGo;
  

    if(isHome && !isInfo){
      viewTOGo = <CurrentWeatherComponent weather={weatherCondition} temperature={temperature} sunrise={sunrise} sunset={sunset} current={current} />;
    }else if(!isHome && isInfo){
      viewTOGo = <Text style={styles.container}>This IS THE SECOND VIEW</Text>;
    }


    return (
    <View style={styles.container}>
        {isLoading ? <Text style={styles.container}>Fetching The Weather...</Text> : viewTOGo}

    <BottomNavigation
      tabs={this.tabs}
      activeTab={this.state.activeTab}
      onTabPress={newTab => this.handleOnPress(newTab)}
      renderTab={this.renderTab}
      useLayoutAnimation
    />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff'
  }
});

AppRegistry.registerComponent('brogramming_weather', () => brogramming_weather);
