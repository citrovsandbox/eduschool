import React, { Component } from 'react'
import {ActivityIndicator} from 'react-native';

export default class BusyIndicator extends Component {
  render() {
    if(this.props.visible) {
        return (
            <ActivityIndicator size="small" color={this.props.color}/>
        );
    } else {
        return false;
    }
  }
}
