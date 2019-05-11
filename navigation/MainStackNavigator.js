import React from 'react';
import { createStackNavigator } from 'react-navigation';
import DrawerAppNavigator from './DrawerAppNavigator';
import EntryStackNavigator from './stacks/EntryViewStackNavigator';

import AuditView from '../views/AuditView';
import TinderView from '../views/TinderView';

const MainStackNavigator = createStackNavigator({
    EntryPoint:{
        screen:EntryStackNavigator,
        navigationOptions:{
            header:null
        }
    },
    Home:{
        screen: DrawerAppNavigator,
        navigationOptions:{
            header:null,
            gesturesEnabled: false
        }
    },
    AuditView:{
        screen: AuditView,
        navigationOptions:({ navigation }) => {
            var sRouteTitle = navigation.state.params.auditTitle;
            return ({
                headerTitle:sRouteTitle
            })
        } 
    },
    TinderLikeView:{
        screen: TinderView,
        navigationOptions:({ navigation }) => {
            // var sRouteTitle = navigation.state.params.auditTitle;
            return ({
                headerTitle:'Test en cours'
            })
        } 
    }
}, {
    headerMode:'screen',
    
});


export default MainStackNavigator;