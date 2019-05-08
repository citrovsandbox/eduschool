import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, RefreshControl, Text } from 'react-native';
import RankItem from '../components/RankItem';
import { connect } from 'react-redux';
import Theme from '../theme/MainTheme';

class RankingView extends React.Component {
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
        setTimeout(function () {
            this.setState({isMessagesListRefreshing:false});
        }.bind(this), 1000);
    }
    
    _keyExtractor = (item, index) => String(item.id);

    render() {
        const aRanking = this.props.ranking;
        console.log(aRanking);
            return (
                <View style={styles.viewContainer}>
                    <SafeAreaView style={{flex:1}}>
                        <FlatList
                        style={{ flex: 1 }}
                        keyExtractor={this._keyExtractor}
                        data={aRanking}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.isMessagesListRefreshing}
                              onRefresh={this.onMessageListRefresh}
                            />}
                        renderItem={({item}) => (
                            <RankItem itemData={item}/>
                        )}/>
                    </SafeAreaView>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        backgroundColor:Theme.mainColor
    }
});

export default connect(state => state)(RankingView);