import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RankingView from '../../views/RankingView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const RankingStackNavigator = createStackNavigator({
    TestsView:{
        screen: RankingView,
        navigationOptions:{
            headerTitle: 'Classement général',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    }
}, {
    mode:'modal'
});


export default RankingStackNavigator;