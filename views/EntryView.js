import React from 'react';
import { Alert, View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {LinearGradient} from 'expo';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import Hermes from '../http/Hermes';
import Theme from '../theme/MainTheme';
import { Notifications, Permissions } from 'expo';
import BusyIndicator from '../components/BusyIndicator';

class EntryView extends React.Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.onCancelDialogPress = this.onCancelDialogPress.bind(this);
        this.onSendRecovedPasswordPress = this.onSendRecovedPasswordPress.bind(this);
        this.onConnectionPress = this.onConnectionPress.bind(this);
        this._setLoadingMode = this._setLoadingMode.bind(this);
        this._handleRes = this._handleRes.bind(this);
        this._handleForgotRes = this._handleForgotRes.bind(this);
        this._updateStore = this._updateStore.bind(this);
        this.state = {
            email:'',
            password:'',
            dialogVisible:false,
            forgotEmail:'',
            forgotText:'',
            isLoading:false,
            conTextDisplay:'flex'
        }
    }
    showDialog () {
        this.setState({ dialogVisible: true });
    }
    onCancelDialogPress () {
        this.setState({ dialogVisible: false });
    }
    onSendRecovedPasswordPress () {
        this._setLoadingMode(true);
        let sEmail = this.state.forgotEmail;
        let sCode = this.state.forgotCode;
        let oData = {email:sEmail, code:sCode};
        console.log(oData);
        Hermes.post('/forgotPassword', oData).then((res) => {
            this._handleForgotRes(res);
            this._setLoadingMode(false);
        }).catch(err => console.error(err));
        this.onCancelDialogPress();
    }
    onConnectionPress () {
        this._setLoadingMode(true);
        let sEmail = this.state.email;
        let sPassword = this.state.password;
        let oData = {
            email:sEmail,
            pass:sPassword
        };
        Hermes.post('/login', oData).then((loginResponse) => {
            Hermes.get('/course').then(courseResponse => {
                Hermes.get('/ranking').then(rankingResponse => {
                    this._updateStore(loginResponse.data, courseResponse.data, rankingResponse.data);
                    this._handleRes(loginResponse);
                    this._setLoadingMode(false);
                });
            });
        }).catch((err) => {console.error(err);this._setLoadingMode(false)});
    }
    _setLoadingMode (bool) {
        if (bool) {
            this.setState({conTextDisplay:'none', isLoading:true});
        } else {
            this.setState({conTextDisplay:'flex', isLoading:false});
        }
    }
    _handleRes (res) {
        let code = res.code;
        let sMessage = res.details;
        switch(code) {
            case 200:
            this.props.navigation.navigate("Home");
            break;
            case 401:
            Alert.alert('Hum...',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 404:
            Alert.alert('Hum...',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 403:
            Alert.alert('Hum...',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 460:
            Alert.alert('Mince alors !',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 500:
            Alert.alert('Oups !','Veuillez réessayer dans quelques minutes.',[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            default:
            Alert.alert('Serveur indisponible',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
        }
    }
    _handleForgotRes (res) {
        let code = res.code;
        let sMessage = res.message;
        switch(code) {
            case 200:
            Alert.alert('Génial !',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 403:
            Alert.alert('Hum...',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 460:
            Alert.alert('Mince alors !',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            case 500:
            Alert.alert('Oups !','Veuillez réessayer dans quelques minutes.',[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
            break;
            default:
            Alert.alert('Serveur indisponible',sMessage,[{text: 'Ok', onPress: () => {return null}},],{cancelable:false});
        }
    }
    /**
     * @private
     * Fonction permettant de mettre à jour le Store Redux
     * Afin de mettre à jour les autres vues de l'application
     * @param {Object} res La réponse provenant du serveur
     * @return {void}
     */
    _updateStore (userData, courseData, rankingData) {
        // Enregistrement des données de l'utilisateur
        const action = {
            type:'REGISTER_USER_DATA',
            value:userData
        };
        this.props.dispatch(action);
        // Enregistrement des cours disponibles
        const action2 = {
            type:'REGISTER_AVAILABLE_COURSES',
            value:courseData
        };
        this.props.dispatch(action2);

        const action3 = {
            type:'REGISTER_RANKING',
            value:rankingData
        };
        this.props.dispatch(action3);
    }
    /**
     * @hook
     * Fonction standard. Cycle de vie.
     * @return {void}
     */
    render() {
        return (
            <View style={styles.viewContainer}>
                <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView style={styles.formContainerContainer} behavior="padding">
                    <ScrollView contentContainerStyle={styles.formContainer}>
                    <Text style={styles.ectrlText}>EDUSCHOOL</Text>
                    <Text style={styles.subtitleText}>Quand l'apprentissage rencontre le jeu</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="Adresse e-mail"
                        autoComplete="email"
                        onChangeText={ (email) => this.setState({email:email}) }
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        autoComplete="password"
                        onChangeText={ (password) => this.setState({password:password})}
                        />
                        <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={this.onConnectionPress}
                        >
                            <Text style={[styles.loginBtnText, {display:this.state.conTextDisplay}]} >CONNEXION</Text>
                            <BusyIndicator color='white' visible={this.state.isLoading}/>                        
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity
                            style={styles.forgotPassBtn}
                            onPress={() => this.showDialog()}
                            >
                                <Text style={styles.forgotPassTxt}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.forgotPassBtn}
                            onPress={() => this.props.navigation.navigate('RegisterView')}
                            >
                                <Text style={styles.registerText}>Inscription</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                    </SafeAreaView>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Mot de passe oublié ?</Dialog.Title>
                    <Dialog.Description>
                        Renseignez le formulaire afin de récupérer un nouveau mot de passe.
                    </Dialog.Description>
                    <Dialog.Input 
                    placeholder="Adresse email" 
                    wrapperStyle={{padding:10}}
                    onChangeText={ (forgotEmail) => this.setState({forgotEmail:forgotEmail}) }/>
                    <Dialog.Input 
                    placeholder="Code entreprise" 
                    wrapperStyle={{padding:10}}
                    onChangeText={(forgotCode) => this.setState({forgotCode:forgotCode})}/>
                    <Dialog.Button label="Annuler" onPress={this.onCancelDialogPress} />
                    <Dialog.Button label="Envoyer" onPress={this.onSendRecovedPasswordPress} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Theme.mainColor
    },
    safeAreaContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    formContainerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    ectrlText:{
        fontSize:50, fontWeight:'bold',
        color:Theme.alternativeColor
    },
    subtitleText:{
        fontSize:14,
        color:Theme.alternativeColor,
        marginBottom:40
    },
    forgotPassBtn:{
        marginTop:-10,
        marginBottom:5,
        width:150
    },
    forgotPassTxt:{
        color:Theme.alternativeColor
    },
    registerText:{
        color:Theme.alternativeColor,
        fontWeight:'bold',
        textAlign:'right'
    },
    input:{
       width:300, height:50,
       backgroundColor:'white',
       padding:10,borderRadius:10,
       marginBottom:20
    },
    loginBtn:{
        width:300, height:50,
        backgroundColor:Theme.alternativeColor,
        color:'#188c8c', borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginBottom:20
    },
    registerBtn:{
        width:300, height:50,
        backgroundColor:'#e1e9ea',
        color:'#188c8c', borderRadius:10,
        marginBottom:20
    },
    loginBtnText:{
        color:'white'
    },
    separateurText:{
        color:'white',
        marginBottom:20
    }
});

export default connect(state => state)(EntryView);