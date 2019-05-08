import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HelpView from '../../views/HelpView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const FaqStackNavigator = createStackNavigator({
    HelpViewRoute:{
        screen: HelpView,
        navigationOptions:{
            headerTitle: 'FAQ',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    }
}, {
    mode:'modal',
    headerMode:'screen'
});


export default FaqStackNavigator;