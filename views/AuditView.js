import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BusyIndicator from '../components/BusyIndicator';
import ProgressListIndicator from '../components/ProgressListIndicator';
import {connect} from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../theme/MainTheme';
import Hermes from '../http/Hermes';

class AuditView extends React.Component {
    constructor(props) {
        super(props);
        this.onGoToGridPress = this.onGoToGridPress.bind(this);
        this.onDeleteAuditPress = this.onDeleteAuditPress.bind(this);
        this._fetchAudit = this._fetchAudit.bind(this);
        this._setDeleteMode = this._setDeleteMode.bind(this);
        this._updateTinderViewBackgroundColor = this._updateTinderViewBackgroundColor.bind(this);
        this.state = {
            isLoading:false,
            isDeleting:false,
            btnTextDisplay:'flex',
            btnDeleteTextDisplay:'flex'
        };
    }
    /**
     * @public
     * Méthode permettant de reprendre la grille
     * @return {void}
     */
    onGoToGridPress () {
        this._setLoadingMode(true);
        let sUuidAudit = this.props.navigation.state.params.uuidAudit;
        Hermes.get('/audit/' + sUuidAudit).then((res) => {
            this._registerTinderData(res);
            this._updateTinderViewBackgroundColor();
            this._setLoadingMode(false);
        }).catch((err) => {
            console.log(err);
            this._setLoadingMode(false);
        });
        this._setLoadingMode(true);
        setTimeout(() => {
            this._setLoadingMode(false);
            this.props.navigation.navigate('TinderLikeView', {auditTitle:this.props.navigation.state.params.auditTitle});
        }, 1000);
    }
    /**
     * @public
     * Méthode permettant de supprimer l'audit
     * @return {void}
     */
    onDeleteAuditPress () {
        let sUuidAudit = this.props.navigation.state.params.uuidAudit;
        let sUuidUser = this.props.userData.uuidUser;
        let oAudit = this._fetchAudit(sUuidAudit);
        let oData = {
            uuidAudit:oAudit.uuidAudit
        }
        this._setDeleteMode(true);

        Hermes.delete('/audit', oData).then((res) => {
            Hermes.get('/user/' + sUuidUser).then((res) => {
                console.log("After user deletion");
                console.log(res);
                this._updateStore(res);
                this._setDeleteMode(false);
                this.props.navigation.goBack();
            }).catch((err) => {
                console.error(err);
                this._setDeleteMode(false);
            });
            this._setDeleteMode(false);
        }).catch((err) => {
            console.error(err);
            this._setDeleteMode(false);
        });
        
    }
    /**
     * @private
     * Fonction permettant de mettre à jour le Store Redux
     * Afin de mettre à jour les autres vues de l'application
     * @param {Object} res La réponse provenant du serveur
     * @return {void}
     */
    _updateStore (res) {
        const action = {
            type:'REGISTER_USER_DATA',
            value:res.result
        };
        this.props.dispatch(action);
    }
    /**
     * @private
     * Méthode permettant d'activer ou pas l'état de chargement
     * @return {void}
     */
    _setLoadingMode (bool) {
        if (bool) {
            this.setState({btnTextDisplay:'none', isLoading:true});
        } else {
            this.setState({btnTextDisplay:'flex', isLoading:false});
        }
    }
    /**
     * @private
     * Méthode permettant d'aller chercher le statut en fonction de l'audit
     * @return {String} Le statut à afficher
     */
    _getStatus (oAudit) {
        switch(oAudit.auditStatus) {
            case 1:
            return 'En cours';
            case 2:
            return 'Validé';
            case 3:
            return 'Non validé';
        }
    }
    _getDate (oAudit) {
        let sBruteDate = oAudit.auditCreatedAt.date;
        let sYear = sBruteDate.substr(0, 4);
        let sMonth = sBruteDate.substr(5,2);
        let sDay = sBruteDate.substr(8,2);
        return sDay + '/' + sMonth + '/' + sYear;
    }
    _registerTinderData (res) {
        const action = {
            type:'REGISTER_TINDER_DATA',
            value:res.result
        }
        this.props.dispatch(action);
    }
    _fetchAudit (uuid) {
        let aAudits = this.props.userData.audits;
        for(var i = 0 ; i < aAudits.length ; i++) {
            if(aAudits[i].uuidAudit === uuid) {
                return aAudits[i];
            }
        }
        return false;
    }
    _getAuditButtonOpacity (oAudit) {
        if(oAudit.auditStatus === 1) {
            return 1;
        } else {
            return 0.3;
        }
    }
    _getEnableStatus(oAudit) {
        if(oAudit.auditStatus === 1) {
             return false;
        } else {
            return true;
        }
    }
    _setDeleteMode (bool) {
        if(bool) {
            this.setState({isDeleting:true});
            this.setState({btnDeleteTextDisplay:'none'});
        } else {
            this.setState({isDeleting:false});
            this.setState({btnDeleteTextDisplay:'flex'});
        }
    }
    _bg (status) {
        switch(status) {
            case 1:
            return Theme.alternativeColor;
            case 2:
            return Theme.tchernobylNenuphar;
            case 3:
            return '#FF0000';
        }
    }

    _color (status) {
        return 'white';
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
        let sUuidAudit = this.props.navigation.state.params.uuidAudit;
        let oAudit = this._fetchAudit(sUuidAudit);
        if(oAudit) {
        let sDisplayScore = oAudit.score === '0%' ? 'none' : 'flex';
        let sStatus = this._getStatus(oAudit);
        let sDate = this._getDate(oAudit);
        let color = this._color(oAudit.auditStatus);
        let bg = this._bg(oAudit.auditStatus);
        let iOpacity = this._getAuditButtonOpacity(oAudit);
        let  bAuditButtonEnabled = this._getEnableStatus(oAudit);
        return (
        <View style={styles.viewContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>{oAudit.certificationTitle}</Text>
                    <Text style={{marginTop:20, textAlign:'center'}}>Grille de certification EKALIT</Text>
                </View>
                <View style={styles.flatListContainer}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <ProgressListIndicator color={color} bgColor={bg} text={sStatus} />
                    </View>
                    <Text style={styles.welcomeSubtitle}>Créé le : <Text style={{fontWeight:'normal'}}>{sDate}</Text></Text>
                    <Text style={styles.welcomeSubtitle}>Progression : <Text style={{fontWeight:'normal'}}>{oAudit.progression}</Text></Text>
                    <Text style={[styles.welcomeSubtitle, {display:sDisplayScore}]}>Score : <Text style={{fontWeight:'normal'}}>{oAudit.score}</Text></Text>
                </View>
                <View style={{flex:2, justifyContent:'center', alignitems:'center'}}>
                    <TouchableOpacity
                        style={[styles.changePassButton, {opacity:iOpacity}]}
                        onPress={this.onGoToGridPress}
                        disabled={bAuditButtonEnabled}
                        >
                        <View style={{flexDirection:'row', alignItems:'center', display:this.state.btnTextDisplay}}>
                        <AntDesign name="edit" size={20}  style={{color:'white', marginRight:20}}/>
                        <Text style={styles.changePassButtonText}>Reprendre l'audit</Text>
                        </View>
                        <BusyIndicator color='white' visible={this.state.isLoading}/> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createAuditButton}
                        onPress={this.onDeleteAuditPress}
                        >
                        <Text style={[styles.deleteAuditText, {display:this.state.btnDeleteTextDisplay}]}>Supprimer l'audit</Text>
                        <BusyIndicator color='red' visible={this.state.isDeleting}/> 
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
        );
        } else {
            return (
                <View></View>
            )
        }
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:20
      },
      flatListContainer:{
          flex:2,
          width:'100%'
    },
    profilePicContainer:{
        flex:2,
        backgroundColor:Theme.alternativeColor,
        alignItems:'center', justifyContent:'center'
    },
    auditInfosContainer:{
        borderRadius:20,
        borderColor:'white',
        borderWidth:1,
        padding:20,
        width:300,
        marginBottom:100
    },
    certPic:{
        width:150,height:150,
        borderRadius:60,
        marginBottom:20
    },
    welcomeText:{
        fontSize:40,
        color:'black',
        fontWeight:'bold',
        textAlign:'left'
    },
    welcomeSubtitle:{
        fontSize:16,
        color:'black',
        fontWeight:'bold',
        textAlign:'center',
        lineHeight:30
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
        backgroundColor:Theme.alternativeColor,
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginBottom:20
    },
    changePassButtonText:{
        color:'white',
        fontWeight:'bold'
    },
    deleteAuditText:{
        color:'red',
        textAlign:'center'
    }
});

export default connect(state => state) (AuditView);