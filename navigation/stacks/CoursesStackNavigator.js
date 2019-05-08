import React from 'react';
import { createStackNavigator } from 'react-navigation';

import CoursesView from '../../views/CoursesView';
import WebView from '../../views/WebView';

import BurgerMenuButton from '../../components/BurgerMenuButton';

const CoursesStackNavigator = createStackNavigator({
    CoursesView:{
        screen: CoursesView,
        navigationOptions:{
            headerTitle: 'Cours disponibles',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    },
    WebView:{
        screen:WebView,
        navigationsOptions:{
            header:null
        }
    }
}, {
    mode:'modal'
});


export default CoursesStackNavigator;