import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ProgressListIndicator from './ProgressListIndicator';
import Theme from '../theme/MainTheme';

class UserTest extends React.Component {
    constructor(props) {
        super(props);
        this.onMessagePreviewPress = this.onMessagePreviewPress.bind(this);
        this._bg = this._bg.bind(this);
    }
    /**
     * Lorque l'utilisateur clique sur la photo d'un utilisateur
     * Permet de naviguer sur la page de son profil
     */
    onMessagePreviewPress () {
        // var oItemData = this.props.itemData;
        // this.props.navigation.navigate("AuditView", {
        //     auditTitle:oItemData.certificationTitle,
        //     uuidAudit:oItemData.uuidAudit
        // });
    }
    _bg (theme) {
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
        // let status = this.props.itemData.auditStatus;
        let bg = this._bg(this.props.itemData.theme);
        // let color = this._color();
        // let text = this._text(status);

        return (
            <TouchableOpacity
            onPress={this.onMessagePreviewPress}
            >
                <View style={styles.inboxRowContainer}>
                    <View style={styles.previewZone}>
                        <View style={{padding:3, borderRadius:3, backgroundColor:bg}}>
                            <Text style={styles.certificationTitle}>{this.props.itemData.theme}</Text>
                        </View>
                    </View>
                    <View style={styles.previewZone2}>
                        {/* <ProgressListIndicator color={color} bgColor={bg} text={text} /> */}
                    </View>
                        <View style={styles.navArrowContainer}>
                        <Ionicons name="ios-arrow-forward" size={15} color={Theme.mainColor}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    inboxRowContainer:{
        backgroundColor:'white',
        width:'100%', height:100,
        flexDirection:'row',
        borderColor:'rgb(243,243,243)',
        padding:20
    },
    contactIconZone:{
        flex:1,
        alignItems:'center', justifyContent:'center',
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
    previewZone2:{
        flex:2
    },
    certificationTitle:{
        fontSize:14,
        fontWeight:'bold',
        color:'black'
    },
    progressContainer:{
        backgroundColor:Theme.mainColor,
        borderRadius:10,
        padding:5
    },
    progressText:{
        fontSize:14,
        fontWeight:'bold',
        padding:5
    },
    previewText:{
        fontSize:14,
        color:'white'
    },
    navArrowContainer:{
        flex:0.5,
        alignItems:'center', justifyContent:'center'
    }
});

export default withNavigation(UserTest);