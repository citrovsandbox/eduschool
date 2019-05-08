import { createStackNavigator } from 'react-navigation';
import RegisterView from '../../views/RegisterView';
import EntryView from '../../views/EntryView';

const EntryViewStackNavigator = createStackNavigator({
    EntryView:{
        screen:EntryView,
        navigationOptions:{
            header:null,
            headerBackTitle:'Connexion'
        }
    },
    RegisterView:{
        screen: RegisterView,
        navigationOptions:{
            headerTitle:'Inscription'
        }
    },
}, {
    mode:'modal'
});


export default EntryViewStackNavigator;