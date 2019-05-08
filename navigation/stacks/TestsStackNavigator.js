import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TestsView from '../../views/TestsView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const TestsStackNavigator = createStackNavigator({
    TestsView:{
        screen: TestsView,
        navigationOptions:{
            headerTitle: 'Effectuer un test',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    }
}, {
    mode:'modal'
});


export default TestsStackNavigator;