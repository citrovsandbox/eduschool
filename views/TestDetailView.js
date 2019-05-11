import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../theme/MainTheme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

 class TestDetail extends React.Component {
    
    getThemeBg = (theme) => {
        switch(theme) {
            case "Sciences physiques":
            return "#FB497D";
            case "Mathématiques":
            return "#15C6BF";
            case "Histoire":
            return "#C4E0F4";
            case "Culture du sport":
            return "#FDA381"
            case "Espagnol":
            return "#EBB962";
            case "Architecture":
            return "#90575D"
            case "Géographie":
            return "#3D1842"
            case "Sciences et vie de la Terre":
            return "#14EAAE";
            break;
            default:
            return Theme.alternativeColor
        }
    }
    render () {
        let oTestData = this.props.navigation.state.params.testData;
        return (
        <View style={styles.viewContainer}>
            <View style={styles.scoreContainer}>
                <MaterialCommunityIcons name="test-tube" size={70} />
                <Text style={styles.scoreText}>{oTestData.score} / 10</Text>
                <View style={[styles.themeBg, {backgroundColor:this.getThemeBg(oTestData.theme)}]}>
                    <Text style={styles.themeText}>{oTestData.theme}</Text>
                </View>
            </View>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        backgroundColor:Theme.alternativeColor,
        alignItems:'center', justifyContent:'center'
    },
    scoreText:{
        fontSize:30,
        marginBottom:10
    },
    dateText:{
        fontSize:30
    },
    scoreContainer:{
        padding:10,
        borderRadius:5,
        backgroundColor:"white",
        alignItems:'center', justifyContent:'center'
    },
    themeBg:{
        borderRadius:3,
        padding:3
    }
});

export default TestDetail;