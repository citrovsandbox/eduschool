import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import Theme from '../theme/MainTheme';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.onQuestionPress = this.onQuestionPress.bind(this);
    }
    /**
     * Fonction permettant de répondre à la question lorsque l'utilisateur clique
     * sur la question donnée
     * @param {String} sResponseText La réponse à la question
     */
    onQuestionPress (sResponseText) {
        Alert.alert(
            'Information ',
            sResponseText,
            [
              {text: 'Merci', onPress: () => {return null}},
            ],
            { cancelable: false }
          ) 
    }
    render() {

        return (
            <TouchableOpacity
            onPress={() => {this.onQuestionPress(this.props.itemData.answer)}}
            >
                <View style={styles.inboxRowContainer}>
                    <View style={styles.previewZone}>
                        <Text style={styles.certificationTitle}>{this.props.itemData.question}</Text>
                    </View>
                    <View style={styles.navArrowContainer}>
                        <Ionicons name="ios-information-circle-outline" size={20} color={Theme.mainColor}/>
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
    previewZone:{
        flex:3,
        alignItems:'flex-start', justifyContent:'center'
    },
    certificationTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    navArrowContainer:{
        flex:0.5,
        alignItems:'center', justifyContent:'center'
    }
});

export default withNavigation(Question);