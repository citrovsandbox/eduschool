import React from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Dialog from "react-native-dialog";
import { Entypo } from '@expo/vector-icons';
import Theme from '../theme/MainTheme';
import { connect } from 'react-redux';

class TestsView extends React.Component {
    constructor(props) {
        super(props);
        this.onChangePasswordPress = this.onChangePasswordPress.bind(this);
        this.onDeleteAccountPress = this.onDeleteAccountPress.bind(this);
        this.onSubmitNewPasswordPress = this.onSubmitNewPasswordPress.bind(this);
        this.onCancelDialogPress = this.onCancelDialogPress.bind(this);
        this.state = {
            dialogVisible:false
        };
    }
    onChangePasswordPress () {
        this.setState({dialogVisible:true});
    }
    onSubmitNewPasswordPress () {
        this.setState({dialogVisible:false});
    }
    onDeleteAccountPress () {
        Alert.alert(
            'Attention ⚠️',
            'Êtes-vous sûr de vouloir supprimer votre compte ?',
            [
              {text: 'Annuler', onPress: () => {return null}},
              {text: 'Confirmer', onPress: () => {
                // AsyncStorage.clear();
                props.navigation.navigate('EntryPoint')
              }},
            ],
            { cancelable: false }
          );  
    }
    onCancelDialogPress () {
        this.setState({dialogVisible:false});
    }
    render() {
        return (
        <View style={styles.viewContainer}>
                <View style={styles.profilePicContainer}>
                    <Image
                    source={require('../assets/flat/flat_girl.jpg')}
                    style={styles.persona}
                    />
                    <Text style={styles.welcomeText}>Bonjour, {this.props.userData.firstName}.</Text>
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
                onChangeText={ (forgotEmail) => this.setState({forgotEmail:forgotEmail}) }/>
                <Dialog.Input 
                placeholder="Nouveau mot de passe" 
                wrapperStyle={{padding:5}}
                onChangeText={(forgotCode) => this.setState({forgotCode:forgotCode})}/>
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

export default connect(state => state)(TestsView);