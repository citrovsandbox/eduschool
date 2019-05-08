import React from 'react';
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity, ImageBackground} from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import {connect} from 'react-redux';
import Hermes from '../http/Hermes';

class CertificationTinderView extends React.Component {
    constructor(props) {
        super(props);
        this.onApprove = this.onApprove.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onLater = this.onLater.bind(this);
        this.onCardSwipe = this.onCardSwipe.bind(this);
        this._getCardContext = this._getCardContext.bind(this);
        this._getNextCardContext = this._getNextCardContext.bind(this);
        this._reloadUserData = this._reloadUserData.bind(this);
        this._registerUserData = this._registerUserData.bind(this);
        this._hexToRgbA = this._hexToRgbA.bind(this);
        this._updateBackgroundColor = this._updateBackgroundColor.bind(this);
    }
    onCardSwipe (iCardIndex) {
      let oNextCard = this._getNextCardContext(iCardIndex);
      this._updateBackgroundColor(oNextCard);
    }
    onApprove (iCardIndex) {
      let oCard = this._getCardContext(iCardIndex);
      let oData = {
        uuidResult:oCard.uuidResult,
        state:3
      };
      Hermes.put('/audit', oData).then((res) => {
        this._reloadUserData();
      }).catch((err) => {
        console.error(err);
      });
    }
    onDecline (iCardIndex) {
      let oCard = this._getCardContext(iCardIndex);
      let oData = {
        uuidResult:oCard.uuidResult,
        state:1
      };
      Hermes.put('/audit', oData).then((res) => {
        this._reloadUserData();
      }).catch((err) => {
        console.error(err);
      });
    }
    onLater (iCardIndex) {
      let oCard = this._getCardContext(iCardIndex);
      let oData = {
        uuidResult:oCard.uuidResult,
        state:2
      };
      Hermes.put('/audit', oData).then((res) => {
        this._reloadUserData();
      }).catch((err) => {
        console.error(err);
      });
    }
    /**
     * @private
     * Retourne le contexte de la carte sous la forme d'un objet
     * @param {Integer} iCardIndex L'index de la carte dans la stack
     * @return {Object} Le contexte de la carte
     */
    _getCardContext (iCardIndex) {
      let aRequirements = this.props.tinderData.requirementsLeft;
      return aRequirements[iCardIndex];
    }
    /**
     * @private
     * Retourne le contexte de la carte sous la forme d'un objet
     * @param {Integer} iCardIndex L'index de la carte dans la stack
     * @return {Object} Le contexte de la carte
     */
    _getNextCardContext (iCardIndex) {
      let aRequirements = this.props.tinderData.requirementsLeft;
      return aRequirements[iCardIndex + 1];
    }
    /**
     * @private
     * Permet de recharger les données utilisateur suite à une réponse au quizz
     * Met à jour les avancements, etc
     * @return {void}
     */
    _reloadUserData () {
      let sUuidUser = this.props.userData.uuidUser;
      Hermes.get('/user/' + sUuidUser).then((res) => {
        this._registerUserData(res);
        // this._updateBackgroundColor();
      }).catch((err) => {
        console.error(err);
      });
    }
    /**
     * @private
     * Met à jour l'état global suite à _reloadUserData
     * @return {void}
     */
    _registerUserData (res) {
      const action = {
        type:'REGISTER_USER_DATA',
        value:res.result
      };
      this.props.dispatch(action);
    }
    _hexToRgbA(hex, alpha){
      var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

      if (alpha) {
          return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
          return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    }
    _updateBackgroundColor (oCard) {
      if(oCard) {
        let color = this._hexToRgbA(oCard.themeColor, 0.3);
        const action = {
          type:'UPDATE_TINDER_BG',
          value:color
        };
        this.props.dispatch(action);
      }
    }
    componentDidUpdate () {

    }
    render () {
        return (
            <View style={{flex:1, backgroundColor:this.props.tinderBg}} ref={globalBackground => {this.globalBackground = globalBackground}}>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <CardStack
                    style={styles.content}
                    renderNoMoreCards={() => <View><Text style={{fontWeight:'700', fontSize:12, color:'white', marginBottom:10}}>Grille d'audit terminée</Text><TouchableOpacity onPress={() => this.props.navigation.navigate("HomeRoute")}><Text style={{textDecorationLine:'underline'}}>Retour au Dashboard</Text></TouchableOpacity></View>}
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={(iCardIndex) => this.onCardSwipe(iCardIndex)}
                    onSwipedLeft={(iCardIndex) => this.onDecline(iCardIndex)}
                    onSwipedRight={(iCardIndex) => this.onApprove(iCardIndex)}
                    onSwipedTop={(iCardIndex) => this.onLater(iCardIndex)}
                    >
                    {this.props.tinderData.requirementsLeft.map((requirementInfo) => {
                      return (
                      <Card style={[styles.card, {overflow:'hidden'}]} key={requirementInfo.uuidRequirement}>
                          <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
                              <ImageBackground source={require('../assets/flat/flat_illu_2.jpg')} style={{width:262, height:240}} />
                              <View style={{position:'relative', flex:1, backgroundColor:'transparent'}} />

                          </View>
                          <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:requirementInfo.themeColor, padding:20}}>
                              <Text style={{fontSize:16, fontWeight:'bold', color:'white', marginBottom:20}}>{requirementInfo.themeTitle}</Text>
                              <Text style={{fontSize:14, color:'white', textAlign:'justify'}}>{requirementInfo.requirementDescription}</Text>
                          </View>
                      </Card>
                    )})}
                    </CardStack>


                    <View style={styles.footer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button,styles.green]} onPress={()=>{
                        this.swiper.swipeLeft();
                        }}>
                        <Entypo name="cross" size={40} style={styles.iconPic}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,styles.green]} onPress={() => {
                        this.swiper.swipeTop();
                        }}>
                        <FontAwesome name="hourglass-1" size={20} style={styles.iconPic}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,styles.green]} onPress={()=>{
                        this.swiper.swipeRight();
                        }}>
                        <Entypo name="check" size={40} style={styles.iconPic}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                </SafeAreaView>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#f2f2f2',
    },
    safeAreaContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    sliderContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'yellow'
    },
    sliderBackGround:{
        flexDirection:'row',
        width:300, height:5,
        borderRadius:3,
        backgroundColor:'white',
        overflow:'visible'
    },
    sliderCursor:{
        position:'relative',
        left:30,top:-2.5,
        width:10, height:10,
        backgroundColor:'#188c8c',
        borderRadius:10
    },
    step1:{
        position:'relative',
        top:0,left:0,
        width:'20%', height:'100%',
        borderBottomLeftRadius:3,
        backgroundColor:'blue'
    },
    content:{
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    card:{
      width: 320,
      height: 470,
      // backgroundColor: '#4692f4',
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity:0.5,
    },
    label: {
      lineHeight: 400,
      textAlign: 'center',
      fontSize: 55,
      fontFamily: 'System', 
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    footer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    buttonContainer:{
      width:'90%',
      // backgroundColor:'red',
      margin:'auto',
      flexDirection:'row'
    },
    button:{
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity:0.5,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      zIndex: 0,
      margin:10
    },
    orange:{
      width:55,
      height:55,
      borderWidth:6,
      borderColor:'#55c3c4',
      borderWidth:4,
      borderRadius:55,
      marginTop:-15
    },
    green:{
      width:55,
      height:55,
      backgroundColor:'white',
      borderRadius:10,
      borderWidth:6,
      borderColor:'transparent',
    },
    red:{
      width:75,
      height:75,
      backgroundColor:'#fff',
      borderRadius:75,
      borderWidth:6,
      borderColor:'#55c3c4',
    },
    iconPic:{
        color:'black'
    }
  });

export default connect(state => state) (CertificationTinderView);