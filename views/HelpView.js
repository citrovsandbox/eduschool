import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Theme from '../theme/MainTheme';
import Question from '../components/Question';
import QuestionsData from '../mockserver/Questions';

export default class HelpView extends React.Component {

    render() {
        return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Vos questions.</Text>
                <Text style={{marginTop:20, textAlign:'center'}}>Nos réponses.</Text>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    style={{ flex: 1 }}
                    data={QuestionsData}
                    renderItem={({ item }) => (<Question itemData={item}/>)}
                />
            </View>
        </SafeAreaView>
        );
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
      welcomeText:{
        fontSize:50,
        textAlign:'center',
        fontWeight:'bold'
      },
      createAuditButton:{
        width:300, height:50,
        backgroundColor:Theme.alternativeColor,
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginBottom:20
      },
      createAuditText:{
        color:'white',
        fontWeight:'bold'
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
      }
});
