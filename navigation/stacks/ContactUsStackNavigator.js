import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ContactUsView from '../../views/ContactUsView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const ContactUsStackNavigator = createStackNavigator({
    ContactUsView:{
        screen: ContactUsView,
        navigationOptions:{
            headerTitle: 'Nous contacter',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    }
}, {
    mode:'modal'
});


export default ContactUsStackNavigator;