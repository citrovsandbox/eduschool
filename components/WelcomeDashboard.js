import React from 'react';
import { Dimensions, Image,SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Theme from '../theme/MainTheme';

class WelcomeDashboard extends React.Component {
  constructor(props) {TouchableOpacity
    super(props);
    this.onMakeNewGridPress = this.onMakeNewGridPress.bind(this);
    this.state = {
        isHistoryRefreshing:false
    };
  }
  onMakeNewGridPress () {
    this.props.navigation.navigate('CertificationsRoute');
  }
  render() {
    const iImgWidth = Dimensions.get('window').width * 0.7;
    return (
      <View style={styles.viewContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <Image 
          source={require('../assets/flat/flat_illustration_welcome.png')}
          style={{width:iImgWidth, height:iImgWidth}}
          />
          <Text style={styles.welcomeText}>Bienvenue</Text>
          <Text style={{marginBottom:100, width:'80%', color:Theme.alternativeColor, textAlign:'center'}}>Et si vous commenciez par aller voir les cours disponibles ?</Text>
          <TouchableOpacity
          style={styles.createAuditButton}
          onPress={this.onMakeNewGridPress}
          >
            <View style={{flexDirection:'row'}}>
              <AntDesign name="eye" size={20}  style={{color:'white', marginRight:20}}/>
              <Text style={styles.createAuditText}>Voir les cours</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex:1
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText:{
    fontSize:50,
    color:Theme.alternativeColor,
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
  }
});

export default withNavigation(WelcomeDashboard);