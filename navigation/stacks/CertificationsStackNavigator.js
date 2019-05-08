import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CertificationsView from '../../views/CertificationsView';
import CertificationView from '../../views/CertificationView';
import BurgerMenuButton from '../../components/BurgerMenuButton';

const CertificationsStackNavigator = createStackNavigator({
    Certifications:{
        screen: CertificationsView,
        navigationOptions:{
            headerTitle: 'Certifications',
            headerLeft:(
                <BurgerMenuButton />
            )
        }
    },
    Certification:{
        screen: CertificationView,
        navigationOptions:({ navigation }) => {
            var sRouteTitle = navigation.state.params.certInfos.certificationTitle;
            return ({
                headerTitle:sRouteTitle
            })
        } 
    }
}, {
    headerMode:'screen'
});


export default CertificationsStackNavigator;