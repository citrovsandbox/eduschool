import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, WebView } from 'react-native';
import Theme from '../theme/MainTheme';
import Question from '../components/Question';
import QuestionsData from '../mockserver/Questions';

export default class WebViewView extends React.Component {

    render() {
        let sLink = this.props.navigation.state.params.link;
        return (
            <WebView 
            source={{uri: sLink}}
            // style={{marginTop: 20}}
            />
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
