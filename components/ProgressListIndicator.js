import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Theme from '../theme/MainTheme';

class ProgressListIndicator extends React.Component {
    render() {
        return (
            <View style={[styles.progressContainer, {backgroundColor:this.props.bgColor}]}>
                <Text numberOfLines={1} style={[styles.previewText, {color:this.props.color}]}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    progressContainer:{
        backgroundColor:Theme.mainColor,
        borderRadius:5,
        padding:5
    }
});

export default withNavigation(ProgressListIndicator);