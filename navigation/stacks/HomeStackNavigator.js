import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeView from '../../views/HomeView';
import TestDetailView from '../../views/TestDetailView';
import BurgerMenuButton from '../../components/BurgerMenuButton';
import CreateNewAuditButton from '../../components/WatchCourses';

const HomeStackNavigator = createStackNavigator({
    HomeStackNavDefault:{
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
    },
    TestDetail:{
        screen: TestDetailView,
        navigationOptions:({navigation}) => {
            function timeConverter(UNIX_timestamp){
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                var time = date + ' ' + month + ' ' + year;
                return time;
            }
            console.log(navigation);
            console.log(navigation.getParam("testData"));
            return ({
                headerTitle: timeConverter(navigation.getParam("testData").createdAt)
            })}
    }
}, {
    headerMode:'screen'
});


export default HomeStackNavigator;