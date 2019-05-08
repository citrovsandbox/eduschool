import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, RefreshControl, Text } from 'react-native';
import Course from '../components/Course';
import { connect } from 'react-redux';

class CoursesView extends React.Component {
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
    
    _keyExtractor = (item, index) => '' + item.id;

    render() {
        const aCourses = this.props.availableCourses;
        if(aCourses.length < 1) {
            return (
                <View style={styles.viewContainer}>
                    <SafeAreaView style={{flex:1}}>
                        <Text>Oups.</Text>
                        <Text>Votre entreprise n'a pas encore de certifications disponibles. Contactez votre administrateur pour obtenir plus de détails.</Text>
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
                        data={aCourses}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.isMessagesListRefreshing}
                              onRefresh={this.onMessageListRefresh}
                            />}
                        renderItem={({item}) => (
                            <Course itemData={item}/>
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

export default connect(state => state)(CoursesView);