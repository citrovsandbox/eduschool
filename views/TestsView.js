import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, RefreshControl, Text } from 'react-native';
import Test from '../components/Test';
import Hermes from '../http/Hermes';
import { connect } from 'react-redux';

class TestsView extends React.Component {
    constructor(props) {
        super(props);
        this.onMessageListRefresh = this.onMessageListRefresh.bind(this);
        this.state = {
            isMessagesListRefreshing:false,
            searchValue:null
        };
    }
    onMessageListRefresh () {
        this.setState({isMessagesListRefreshing:true});
        Hermes.get('/tests').then((testsData) => {
            this._updateTests(testsData.data);
            this.setState({isMessagesListRefreshing:false});
        });
    }

    _updateTests = (testData) => {
        const action = {
            type:'REGISTER_AVAILABLE_TESTS',
            value:testData
        };
        this.props.dispatch(action);
    }

    _keyExtractor = (item) => '' + item.id;

    render() {
        const aTests = this.props.availableTests;
        if(aTests.length < 1) {
            return (
                <View style={styles.viewContainer}>
                    <SafeAreaView style={{flex:1}}>
                        <Text>Oups.</Text>
                        <Text>Aucun test n'est disponible pour le moment. Patience...</Text>
                    </SafeAreaView>
                </View> 
            );
        } else {
            return (
                <View style={styles.viewContainer}>
                    <SafeAreaView style={{flex:1}}>
                        <FlatList
                        style={{ flex: 1 }}
                        keyExtractor={this._keyExtractor}
                        data={aTests}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.isMessagesListRefreshing}
                              onRefresh={this.onMessageListRefresh}
                            />}
                        renderItem={({item}) => (
                            <Test itemData={item}/>
                        )}/>
                    </SafeAreaView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        backgroundColor:'white'
    }
});

export default connect(state => state)(TestsView);