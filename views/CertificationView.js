import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import BusyIndicator from '../components/BusyIndicator';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../theme/MainTheme';
import Hermes from '../http/Hermes';

class CertificationView extends React.Component {
    constructor(props) {
        super(props);
        this.onCreateGridPress = this.onCreateGridPress.bind(this);
        this._updateStore = this._updateStore.bind(this);
        this._registerTinderData = this._registerTinderData.bind(this);
        this.state = {
            isLoading:false,
            btnTextDisplay:'flex'
        };
    }
    onCreateGridPress () {
        let sUuidUser = this.props.userData.uuidUser;
        this._setLoadingMode(true);
        let oCertData = this.props.navigation.state.params.certInfos;
        let oUserData = this.props.userData;
        let oData = {
            uuidUser:oUserData.uuidUser,
            uuidCertification:oCertData.uuidCertification
        };
        Hermes.post('/audit', oData).then((response) => {
            this._registerTinderData(response);
            Hermes.get('/user/' + sUuidUser).then((res) => {
                this._updateStore(res);
                this._updateTinderViewBackgroundColor();
                this._setLoadingMode(false);
                this.props.navigation.navigate('TinderLikeView', {auditTitle:response.result.certificationsTitle});
            }).catch((err) => console.error(err));
        }).catch((err) => {
            this._setLoadingMode(false);
        });
    }
    onCancelDialogPress () {
        this.setState({dialogVisible:false});
    }
    _registerTinderData (res) {
        const action = {
            type:'REGISTER_TINDER_DATA',
            value:res.result
        }
        this.props.dispatch(action);
    }
    _updateStore (res) {
        const action = {
            type:'REGISTER_USER_DATA',
            value:res.result
        };
        this.props.dispatch(action);
    }
    _setLoadingMode (bool) {
        if (bool) {
            this.setState({btnTextDisplay:'none', isLoading:true});
        } else {
            this.setState({btnTextDisplay:'flex', isLoading:false});
        }
    }
    _hexToRgbA(hex, alpha){
        var r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
  
        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
      }
    _updateTinderViewBackgroundColor () {
        let oCard = this.props.tinderData.requirementsLeft[0];
        if(oCard) {
          let color = this._hexToRgbA(oCard.themeColor, 0.3);
          const action = {
            type:'UPDATE_TINDER_BG',
            value:color
          };
          this.props.dispatch(action);
        }
      }
    render() {
      let oCertData = this.props.navigation.state.params.certInfos;
      let sCertPic = oCertData.icon;
        return (
        <View style={styles.viewContainer}>
                <View style={styles.profilePicContainer}>
                    <Text style={styles.welcomeText}>{oCertData.certificationTitle}</Text>
                    <Text style={styles.welcomeSubtitle}>{oCertData.certificationDescription}</Text>
                    <TouchableOpacity
                        style={styles.changePassButton}
                        onPress={this.onCreateGridPress}
                        >
                        <View style={{flexDirection:'row', alignItems:'center', display:this.state.btnTextDisplay}}>
                        <Ionicons name="ios-grid" size={20}  style={{color:Theme.alternativeColor, marginRight:20}}/>
                        <Text style={styles.changePassButtonText}>Remplir une grille</Text>
                        </View>
                        <BusyIndicator color={Theme.alternativeColor} visible={this.state.isLoading}/> 
                    </TouchableOpacity>
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
    },
    safeAreaContainer:{
        
    },
    profilePicContainer:{
        flex:2,
        backgroundColor:Theme.alternativeColor,
        alignItems:'center', justifyContent:'center'
    },
    certPic:{
        width:150,height:150,
        borderRadius:60,
        marginBottom:20
    },
    welcomeText:{
        fontSize:40,
        color:'white',
        fontWeight:'bold'
    },
    welcomeSubtitle:{
        color:'white',
        marginBottom:200,
        padding:20,
        textAlign:'justify'
    },
    profileInfosContainer:{
        flex:1,
        backgroundColor:'green'
    },
    actionsContainer:{
        flex:2,
        alignItems:'center', justifyContent:'center'
    },
    changePassButton:{
        width:300, height:50,
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginBottom:20
    },
    changePassButtonText:{
        color:Theme.alternativeColor,
        fontWeight:'bold'
    },
    deleteAccountText:{
        color:'white'
    }
});

export default connect(state => state) (CertificationView);