import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileView from '../../views/MyProfileView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const ProfileStackNavigator = createStackNavigator({
    ProfileView:{
        screen: ProfileView,
        navigationOptions:{
            headerTitle: 'Mon profil',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    }
}, {
    mode:'modal'
});


export default ProfileStackNavigator;