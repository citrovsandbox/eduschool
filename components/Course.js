import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // 6.2.2
import Theme from '../theme/MainTheme';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.onCoursePress = this.onCoursePress.bind(this);
        this.state = {
        
        };
    }

    onCoursePress () {
        var oItemData = this.props.itemData;
        this.props.navigation.navigate("WebView", {link:oItemData.content});
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
    render() {
        let categoryColor = this._computeCategoryColor(this.props.itemData.theme);
        console.log("inside component");
        console.log(this.props.itemData);
        /**
         * Note:
         * Les images viennent en base64
         * Serait préférable de pouvoir les faire passer en url
         */
        return (
            <TouchableOpacity style={styles.inboxRowContainer}
            onPress={this.onCoursePress}
            >
                <View style={styles.contactIconZone}>
                <MaterialIcons name="book" size={40} color={Theme.alternativeColor} />
                    {/* <Image 
                    source={require('../assets/img/certification.jpg')} 
                    style={styles.icon}
                    /> */}
                </View>
                <View style={styles.previewZone}>
                    <Text style={styles.certificationTitle}>{this.props.itemData.title}</Text>
                    <View style={[styles.categoryContainer, {backgroundColor:categoryColor}]}>
                        <Text numberOfLines={1} style={styles.previewText}>{this.props.itemData.theme}</Text>
                    </View>
                </View>
                <View style={styles.navArrowContainer}>
                    <Ionicons name="ios-arrow-forward" size={15} color='black'/>
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
        backgroundColor:'blue',
        borderRadius:5,
        padding:3,
        marginTop:5
    },
    navArrowContainer:{
        flex:0.5,
        alignItems:'center', justifyContent:'center'
    }
});

export default withNavigation(Course);