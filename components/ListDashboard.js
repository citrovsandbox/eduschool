import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import UserTest from '../components/UserTest';
import Theme from '../theme/MainTheme';
import { connect } from 'react-redux';
import Hermes from '../http/Hermes';

class ListDashboard extends React.Component {
  constructor(props) {TouchableOpacity
    super(props);
    this.onMakeNewGridPress = this.onMakeNewGridPress.bind(this);
    this.onRefreshList = this.onRefreshList.bind(this);
    this._updateStore = this._updateStore.bind(this);
    this.state = {
        isHistoryRefreshing:false
    };
  }
  onMakeNewGridPress () {
    this.props.navigation.navigate('CertificationsRoute');
  }
  onRefreshList () {
    this.setState({isHistoryRefreshing:true});
    let sUuidUser = this.props.userData.uuidUser;
    Hermes.get('/user/' + sUuidUser).then((res) => {
      this._updateStore(res);
      this.setState({isHistoryRefreshing:false});
    }).catch((err) => console.error(err));
  }
  /**
   * @private
   * Fonction permettant de mettre à jour le Store Redux
   * Afin de mettre à jour les autres vues de l'application
   * @param {Object} res La réponse provenant du serveur
   * @return {void}
   */
  _updateStore (res) {
    const action = {
        type:'REGISTER_USER_DATA',
        value:res.result
    };
    this.props.dispatch(action);
  }
  _keyExtractor = (item) => String(item.id);

  render() {
    const aTests = this.props.userData.tests;
    return (
      <View style={styles.viewContainer}>
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>@{this.props.userData.pseudo}</Text>
                <Text style={{marginTop:20, textAlign:'center', color:Theme.alternativeColor}}>Vos derniers tests effectués sur EduSchool.</Text>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    style={{ flex: 1 }}
                    keyExtractor={this._keyExtractor}
                    data={aTests}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isHistoryRefreshing}
                            onRefresh={this.onRefreshList}
                        />}
                    renderItem={({ item }) => (<UserTest itemData={item}/>)}
                />
            </View>
        </SafeAreaView>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex:1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText:{
    fontSize:50,
    textAlign:'center',
    fontWeight:'bold',
    color:Theme.alternativeColor
  },
  createAuditButton:{
    width:300, height:50,
    backgroundColor:Theme.alternativeColor,
    borderRadius:10,
    justifyContent:'center', alignItems:'center',
    marginBottom:20
  },
  createAuditText:{
    color:'white',
    fontWeight:'bold'
  },
  headerContainer:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    padding:20
  },
  flatListContainer:{
      flex:2,
      width:'100%'
  }
});

export default connect(state => state) (ListDashboard);