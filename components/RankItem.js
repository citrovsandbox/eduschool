import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons, AntDesign } from '@expo/vector-icons'; // 6.2.2
import Theme from '../theme/MainTheme';

class RankItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    _computeStarColor = (position) => {
        if(position === 1) {
            return "yellow";
        } else if (position === 2) {
            return "grey";
        } else if (position === 3) {
            return "brown";
        } else {
            return Theme.mainColor;
        }
    }
    render() {
        let starColor = this._computeStarColor(this.props.itemData.position);
        let touchColor = () => {if(this.props.itemData.pseudo === this.props.userData.pseudo) {return Theme.alternativeColor } else { return 'transparent'}};
        /**
         * Note:
         * Les images viennent en base64
         * Serait préférable de pouvoir les faire passer en url
         */
        return (
            <TouchableOpacity style={[styles.inboxRowContainer]} >
                <View style={styles.contactIconZone}>
                    <View style={{backgroundColor:Theme.alternativeColor, color:'white', padding:3, borderRadius:3}}>
                        <Text numberOfLines={1} style={styles.previewText}>{this.props.itemData.position}</Text>
                    </View>
                </View>
                <View style={styles.previewZone}>
                    <Text style={styles.certificationTitle}>{this.props.itemData.pseudo}</Text>
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
        // backgroundColor:Theme.alternativeColor,
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
        fontSize:14,
        fontWeight:'bold',
        color:Theme.alternativeColor
    },
    previewText:{
        fontSize:11,
        color:"white",
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

export default withNavigation(RankItem);