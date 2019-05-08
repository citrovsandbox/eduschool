import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Linking } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Theme from '../theme/MainTheme';

export default class ContactUsView extends React.Component {

    render() {
        return (
        <View style={styles.viewContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                    <Text style={styles.ekalitText}>EKALIT</Text>
                    <Text>à votre écoute du <Text style={{fontWeight:'bold'}}>Lundi</Text> au <Text style={{fontWeight:'bold'}}>Vendredi</Text></Text>
                    <Text style={{marginBottom:20}}>de 9h30 à 18h</Text>
                    <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL('tel:+33612345678')}
                    >
                    <View style={{flexDirection:'row'}}>
                        <FontAwesome name="phone" size={20}  style={{color:'white', marginRight:20}}/>
                        <Text style={styles.loginBtnText}>Nous appeler</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={styles.separateurText}>ou</Text>
                    <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL('mailto:service-client@ekalit.com')}
                    >
                        <View style={{flexDirection:'row'}}>
                        <Feather name="mail" size={20}  style={{color:'white', marginRight:20}}/>
                        <Text style={styles.loginBtnText}>Nous envoyer un email</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={{position:'absolute',bottom:50,  color:'black', fontSize:8, padding:10, textAlign:'justify'}}>Dans le cadre de notre de notre démarche qualité, les appels et les emails sont suceptibles d'être enregistrés. Vous pouvez à tout moment effectuer une réclamation afin de demander la radiation de vos données conformément au RGPD. Prix d'un appel <Text style={{fontWeight:'bold'}}>1,34€ puis 0,12€/min + coût d'un appel local</Text>. EKALIT 2019.</Text>
            </SafeAreaView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    safeAreaContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    ekalitText:{
        fontSize:80, fontWeight:'bold',
        color:Theme.alternativeColor,
        marginBottom:10
    },
    contactBtn:{
        width:300, height:50,
        backgroundColor:Theme.alternativeColor,
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginBottom:20
    },
    loginBtnText:{
        color:'white',
        fontWeight:'bold'
    },
    separateurText:{
        color:'black',
        marginBottom:20
    },
});
