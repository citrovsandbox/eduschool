import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; // 6.2.2
import Theme from '../theme/MainTheme';
import BusyIndicator from '../components/BusyIndicator';
import Hermes from '../http/Hermes';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.onTestPress = this.onTestPress.bind(this);
        this.state = {
            isLoadingData:false,
            conTextDisplay:'flex'
        };
    }

    onTestPress () {
        let themeId = this.props.itemData.id;
        let url = '/test/' + themeId;
        this.setLoadingMode(true);

        Hermes.get(url).then((res) => {
            let aQuestions = res.data;
            this.props.navigation.navigate("TinderLikeView", {testData:aQuestions, themeId:themeId});
            this.setLoadingMode(false);
        });
    }
    _computeCategoryColor = (theme) => {
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
    setLoadingMode = (enable) => {
        if(enable) {
            this.setState({conTextDisplay:'none'});
            this.setState({isLoadingData:true});
        } else {
            this.setState({conTextDisplay:'flex'});
            this.setState({isLoadingData:false});
        }
    }
    render() {
        
        return (
            <TouchableOpacity style={styles.inboxRowContainer}
            onPress={this.onTestPress}
            >
                <View style={styles.contactIconZone}>
                <MaterialCommunityIcons name="test-tube" size={40} color={Theme.alternativeColor} />
                </View>
                <View style={styles.previewZone}>
                    <Text style={styles.certificationTitle}>{this.props.itemData.name}</Text>
                    <View style={styles.categoryContainer}>
                        <Text numberOfLines={1} style={styles.previewText}>{this.props.itemData.questionsNb} questions dispo.</Text>
                    </View>
                </View>
                <View style={styles.navArrowContainer}>
                    <FontAwesome name="gamepad" size={20} color='black' style={{display:this.state.conTextDisplay}}/>
                    <BusyIndicator color='black' visible={this.state.isLoadingData}/>  
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    inboxRowContainer:{
        width:'100%', height:100,
        flexDirection:'row',
        borderColor:'rgb(243,243,243)',
        padding:20
    },
    contactIconZone:{
        flex:1,
        alignItems:'center', justifyContent:'center'
    },
    icon:{
        width:50, height:50, borderRadius:25, backgroundColor:'white', padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    },
    previewZone:{
        flex:3,
        alignItems:'flex-start', justifyContent:'center'
    },
    certificationTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:Theme.alternativeColor
    },
    previewText:{
        fontSize:11,
        color:'white',
        fontWeight:'bold'
    },
    categoryContainer:{
        backgroundColor:'#149ad7',
        borderRadius:5,
        padding:3,
        marginTop:5
    },
    navArrowContainer:{
        flex:0.5,
        alignItems:'center', justifyContent:'center'
    }
});

export default withNavigation(Test);