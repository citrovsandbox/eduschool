import React from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import BusyIndicator from '../components/BusyIndicator';
import Hermes from '../http/Hermes';
import Theme from '../theme/MainTheme';

export default class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.onRegisterPress = this.onRegisterPress.bind(this);
        this._setLoadingMode = this._setLoadingMode.bind(this);
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            pseudo:"",
            isLoading:false,
            conTextDisplay:'flex'
        };
    }
    onRegisterPress () {
        this._setLoadingMode(true);
        let sFirstName = this.state.firstName;
        let sLastName = this.state.lastName;
        let sEmail = this.state.email;
        let sPassword = this.state.password;
        let sPseudo = this.state.pseudo;
        let oData = {
            firstName:sFirstName,
            lastName:sLastName,
            email:sEmail,
            pass:sPassword,
            pseudo:sPseudo
        };
        Hermes.post('/register', oData).then((res) => {
            this._handleRes(res);
            this._setLoadingMode(false);
        }).catch((err) => console.error(err));
    }
    _handleRes (res) {
        let code = res.code;
        let sMessage = res.details;
        switch(code) {
            case 200:
            Alert.alert('Félicitations!',sMessage,[{text: 'Fermer', onPress: () => { this.props.navigation.navigate("EntryView")}},],{cancelable:false});
            break;
            default:
            Alert.alert('Hum...',sMessage,[{text: 'Fermer', onPress: () => {return null}},],{cancelable:false});
        }
    }
    _setLoadingMode (bool) {
        if (bool) {
            this.setState({conTextDisplay:'none', isLoading:true});
        } else {
            this.setState({conTextDisplay:'flex', isLoading:false});
        }
    }
    render() {
        return (
        <View style={styles.viewContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView style={styles.formContainerContainer} behavior="padding">
                <ScrollView contentContainerStyle={styles.formContainer}>
                        <Text style={styles.ectrlText}>EDUSHOOL</Text>
                        <Text style={styles.subtitleText}>Inscription</Text>
                        <View style={styles.formRow2}>
                            <TextInput 
                            style={styles.formInput21}
                            placeholder="Prénom"
                            onChangeText={(firstName) => this.setState({firstName:firstName})}
                            />
                            <TextInput 
                            style={styles.formInput22}
                            placeholder="Nom"
                            onChangeText={(lastName) => this.setState({lastName:lastName})}
                            />
                        </View>
                        <View style={styles.formRow1}>
                            <TextInput 
                            style={styles.formInput1}
                            placeholder="Pseudo"
                            autoComplete="pseudo"
                            onChangeText={(pseudo) => this.setState({pseudo:pseudo})}
                            />
                        </View>
                        <View style={styles.formRow1}>
                            <TextInput 
                            style={styles.formInput1}
                            placeholder="Adresse e-mail"
                            autoComplete="email"
                            onChangeText={(email) => this.setState({email:email})}
                            />
                        </View>
                        <View style={styles.formRow1}>
                            <TextInput 
                            style={styles.formInput1}
                            placeholder="Mot de passe"
                            autoComplete="password"
                            secureTextEntry={true}
                            onChangeText={(pass) => this.setState({password:pass})}
                            />
                        </View>
                        <View style={styles.formRow1}>
                            <TouchableOpacity 
                            style={styles.registerBtn}
                            onPress={this.onRegisterPress}>
                                <Text style={[styles.registerText, {display:this.state.conTextDisplay}]}>INSCRIPTION</Text>
                                <BusyIndicator color='white' visible={this.state.isLoading}/>  
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
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
    formRow1:{
        width:'100%', height:80,
        flexDirection:'row',
        alignItems:'center', justifyContent:'center'
    },
    formInput1:{
        height:50, width:'90%',
        paddingLeft:10,
        backgroundColor:'rgb(248,248,248)',
        borderRadius:5
    },
    formRow2:{
        width:'100%', height:80,
        flexDirection:'row',
        alignItems:'center'
    },
    formInput21:{
        height:50, width:'35%',
        marginLeft:'5%', marginRight:'5%',
        paddingLeft:10,
        backgroundColor:'rgb(248,248,248)',
        borderRadius:5
    },
    formInput22:{
        height:50, width:'40%',
        marginLeft:'2.5%',
        paddingLeft:10,
        backgroundColor:'rgb(248,248,248)',
        borderRadius:5
    },
    registerBtn:{
        width:'90%', height:50,
        backgroundColor:Theme.alternativeColor,
        color:'white', borderRadius:10,
        marginBottom:20,
        alignItems:'center', justifyContent:'center'
    },
    registerText:{
        color:'white',
        textAlign:'right'
    },
});
