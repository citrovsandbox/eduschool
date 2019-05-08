import React from 'react';
import MainStackNavigator from './navigation/MainStackNavigator';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import Store from './store/configureStore';

const Application = createAppContainer(MainStackNavigator);

// export default App;
export default class App extends React.Component {
    render() {
        return (
        <Provider store={Store}>
            <Application/>
        </Provider>
        )
    }
}
