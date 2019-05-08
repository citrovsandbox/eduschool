import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeView from '../../views/HomeView';
import BurgerMenuButton from '../../components/BurgerMenuButton';
import CreateNewAuditButton from '../../components/WatchCourses';

const HomeStackNavigator = createStackNavigator({
    HelpViewRoute:{
        screen: HomeView,
        navigationOptions:{
            headerTitle: 'Dashboard',
            headerLeft:(
                <BurgerMenuButton />
            ),
            headerRight:(
                <CreateNewAuditButton />
            )
        }
    }
}, {
    headerMode:'screen'
});


export default HomeStackNavigator;