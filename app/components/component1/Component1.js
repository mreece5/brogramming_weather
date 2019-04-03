import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';



export default class Component1 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          name:'Component1',
          showName: true,
          message: this.props.message
        }
      }

      static defaultProps = {
          message: 'Default Property Component1 Message'
      }

  render(){
      let name = this.state.showName ? this.state.name : 'No Name';
    return(
      <View>
        <Text>{this.state.message}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component1', () => Component1);