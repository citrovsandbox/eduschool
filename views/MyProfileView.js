import React from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Dialog from "react-native-dialog";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Theme from '../theme/MainTheme';
import { connect } from 'react-redux';
import Hermes from '../http/Hermes';

class MyProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.onChangePasswordPress = this.onChangePasswordPress.bind(this);
        this.onDeleteAccountPress = this.onDeleteAccountPress.bind(this);
        this.onSubmitNewPasswordPress = this.onSubmitNewPasswordPress.bind(this);
        this.onCancelDialogPress = this.onCancelDialogPress.bind(this);
        this.state = {
            old:'',
            newPass:'',
            dialogVisible:false
        };
    }
    onChangePasswordPress () {
        this.setState({dialogVisible:true});
    }
    onSubmitNewPasswordPress () {
        let sOldPass = this.state.old;
        let sNewPass = this.state.new;
        let sUserId = this.props.userData.id;

        Hermes.post('/changePassword', {old:sOldPass, new:sNewPass, userId:sUserId}).then((res) => {
            console.log("Contenu de la réponse");
            console.log(res);
            this._handleRes(res);
        });
    }
    onDeleteAccountPress () {
        Alert.alert(
            'Attention ⚠️',
            'Êtes-vous sûr de vouloir supprimer votre compte ?',
            [
              {text: 'Annuler', onPress: () => {return null}},
              {text: 'Confirmer', onPress: () => {
                props.navigation.navigate('EntryPoint')
              }},
            ],
            { cancelable: false }
          );  
    }
    onCancelDialogPress () {
        this.setState({dialogVisible:false});
    }
    _handleRes = (res) => {
        let code = res.code;
        let sMessage = res.details;
        switch(code) {
            case 200:
            this.setState({dialogVisible:false});
            Alert.alert('Mot de passe changé', sMessage,[{text: 'Fermer', onPress: () => {return null}},],{cancelable:false});
            break;
            default:
            Alert.alert('Hum...',sMessage,[{text: 'Fermer', onPress: () => {return null}},],{cancelable:false});
        }
    }
    render() {
        return (
        <View style={styles.viewContainer}>
                <View style={styles.profilePicContainer}>
                    <MaterialIcons name="book" size={60} color="white" />

                    <Text style={styles.welcomeText}>@{this.props.userData.pseudo}</Text>
                    <Text style={styles.welcomeSubtitle}>Comment allez-vous aujourd'hui ?</Text>
                    <TouchableOpacity
                        style={styles.changePassButton}
                        onPress={this.onChangePasswordPress}
                        >
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Entypo name="key" size={20}  style={{color:Theme.alternativeColor, marginRight:20}}/>
                        <Text style={styles.changePassButtonText}>Modifier mon mot de passe</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createAuditButton}
                        onPress={this.onDeleteAccountPress}
                        >
                        <Text style={styles.deleteAccountText}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                </View>
                <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>Changement de mot de passe</Dialog.Title>
                <Dialog.Description>
                    Renseignez le formulaire afin de récupérer un nouveau mot de passe.
                </Dialog.Description>
                <Dialog.Input 
                placeholder="Mot de passe actuel" 
                wrapperStyle={{padding:5}}
                onChangeText={ (old) => this.setState({old:old}) }/>
                <Dialog.Input 
                placeholder="Nouveau mot de passe" 
                wrapperStyle={{padding:5}}
                onChangeText={(newPass) => this.setState({new:newPass})}/>
                <Dialog.Button label="Annuler" onPress={this.onCancelDialogPress} />
                <Dialog.Button label="Envoyer" onPress={this.onSubmitNewPasswordPress} />
                </Dialog.Container>
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
    persona:{
        width:100,height:100,
        borderRadius:50,
        marginBottom:20
    },
    welcomeText:{
        fontSize:30,
        color:'white',
        fontWeight:'bold'
    },
    welcomeSubtitle:{
        color:'white',
        marginBottom:200
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

export default connect(state => state)(MyProfileView);