import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { Entypo, MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import FaqStackNavigator from '../navigation/stacks/FaqStackNavigator';
import HomeStackNavigator from '../navigation/stacks/HomeStackNavigator';
import ProfileStackNavigator from '../navigation/stacks/ProfileStackNavigator';
import CoursesStackNavigator from '../navigation/stacks/CoursesStackNavigator';
import TestsStackNavigator from '../navigation/stacks/TestsStackNavigator';

import {DrawerItems} from 'react-navigation';
import Theme from '../theme/MainTheme';
import RankingStackNavigator from './stacks/RankingStackNavigator';

const DrawerAppNavigator = createDrawerNavigator({
  HomeRoute: {
    screen: HomeStackNavigator,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerLabel: 'Dashboard',
      drawerIcon: ({ tintColor }) => {
        return (
        <MaterialIcons name="dashboard" size={20}  style={{color:'white'}}/>
      )},
      
    }
  },
  Courses: {
    screen: CoursesStackNavigator,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerLabel: 'Cours disponibles',
      drawerIcon: ({ tintColor }) => {
        return (
        <Entypo name="book" size={20}  style={{color:'white'}}/>
      )},
      
    }
  },
  Tests: {
    screen: TestsStackNavigator,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerLabel: 'Effectuer un test',
      drawerIcon: ({ tintColor }) => {
        return (
        <MaterialCommunityIcons name="test-tube" size={20}  style={{color:'white'}}/>
      )},
      
    }
  },
  Ranking: {
    screen: RankingStackNavigator,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerLabel: 'Classement',
      drawerIcon: ({ tintColor }) => {
        return (
        <Ionicons name="md-podium" size={20}  style={{color:'white'}}/>
      )}
    }
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerLabel: 'Gestion du profil',
      drawerIcon: ({ tintColor }) => {
        return (
        <FontAwesome name="user" size={20}  style={{color:'white'}}/>
      )},
      
    }
  },
}, {
  navigationOptions: {
    drawerLockMode: 'locked-closed'
  },
  contentOptions:{
    activeTintColor:'white',
    activeBackgroundColor:'rgba(255, 255, 255, 0.3)',
    labelStyle: {
      color: 'white',
    }
  },
  contentComponent:(props) => {
    return (
    <View style={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between', backgroundColor:Theme.alternativeColor }}>
        <View forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{width:'100%', height:200, backgroundColor:Theme.alternativeColor, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:30, color:'white', fontWeight:'bold'}}>EDUSCHOOL</Text>
            <Text style={{fontSize:10, color:'white'}}>Quand l'apprentissage rencontre le jeu</Text>
          </View>
          
          <DrawerItems {...props} />
          <TouchableOpacity style={styles.logoutButton} onPress={()=>
            Alert.alert(
              'Déconnexion',
              'Êtes-vous sûr de vouloir vous déconnecter ?',
              [
                {text: 'Annuler', onPress: () => {return null}},
                {text: 'Confirmer', onPress: () => {
                  props.navigation.navigate('EntryPoint')
                }},
              ],
              { cancelable: false }
            )  
          }>
            <View style={styles.item}>
              <Text style={styles.label}>Déconnexion</Text>
            </View>
          </TouchableOpacity>
        </View>
          
    </View>
  )},
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo:{
    height:'100%',width:'100%',
    marginBottom:50
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    color:'white'
  }
});
  
module.exports = DrawerAppNavigator;
