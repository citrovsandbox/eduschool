import React from 'react';
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity, ImageBackground} from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import {connect} from 'react-redux';
import Hermes from '../http/Hermes';
import { ThemeConsumer } from 'react-native-elements';
import Theme from '../theme/MainTheme';

class TinderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          index:0,
          score:0
        }
    }

    onCardSwipe = (iCardIndex) => {
      let userId = this.props.userData.id;
      let url = '/test/' + userId;
      let themeId = this.props.navigation.state.params.themeId;
      let score = this.state.score;
      this.setState({index:iCardIndex});
      // On a 10 cartes, si c'est la dernière carte...
      if(iCardIndex === 9) {
        Hermes.post(url, {themeId:themeId, score:score}).then((res) => {
          console.log("Test enregistré avec succès");
          Hermes.get('/user/' + userId).then((userRes) => {
            this._updateUser(userRes.data);
          });
        });
      }
    }

    _updateUser = (userData) => {
      // Enregistrement des données de l'utilisateur
      const action = {
          type:'REGISTER_USER_DATA',
          value:userData
      };
      this.props.dispatch(action);
    }

    onApprove = (iCardIndex) => {
      let userResponse = 1;
      let currentScore = this.state.score;
      let oCard = this.getCard(iCardIndex);
      if(oCard.answer === userResponse) {
        currentScore++;
        this.setState({score:currentScore});
      }
    }

    onDecline = (iCardIndex) => {
      let userResponse = 0;
      let currentScore = this.state.score;
      let oCard = this.getCard(iCardIndex);
      if(oCard.answer === userResponse) {
        currentScore++;
        this.setState({score:currentScore});
      }
    }

    getCard = (index) => {
      let aQuestions = this.props.navigation.state.params.testData;
      return aQuestions[index];
    }

    saveTest = () => {
      // Sauvegarde du score de l'utilisateur
    }

    render () {
        let aQuestions = this.props.navigation.state.params.testData;
        return (
            <View style={{flex:1, backgroundColor:Theme.mainColor}} ref={globalBackground => {this.globalBackground = globalBackground}}>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <CardStack
                    style={styles.content}
                    renderNoMoreCards={() => <View style={{width:260}}><Text style={{fontWeight:'700', fontSize:20, color:Theme.alternativeColor, marginBottom:10}}>Grille d'audit terminée (Score {this.state.score} / 10)</Text><TouchableOpacity onPress={() => this.props.navigation.navigate("HomeRoute")}><Text style={{fontWeight:'bold'}}>Retourner à l'accueil</Text></TouchableOpacity></View>}
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={(iCardIndex) => this.onCardSwipe(iCardIndex)}
                    onSwipedLeft={(iCardIndex) => this.onDecline(iCardIndex)}
                    onSwipedRight={(iCardIndex) => this.onApprove(iCardIndex)}
                    verticalSwipe={false}
                    >
                    {aQuestions.map((question, index) => {
                      return (
                      <Card style={[styles.card, {overflow:'hidden'}]} key={index}>
                          <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
                              <ImageBackground source={require('../assets/flat/flat_illustration_welcome.png')} style={{width:262, height:262}} />
                              <View style={{position:'relative', flex:1, backgroundColor:'transparent'}} />

                          </View>
                          <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:Theme.alternativeColor, padding:20}}>
                              <Text style={{fontSize:16, fontWeight:'bold', color:'white', marginBottom:20}}>Question</Text>
                              <Text style={{fontSize:14, color:'white', textAlign:'justify'}}>{question.asking}</Text>
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
                        {/* <TouchableOpacity style={[styles.button,styles.green]} onPress={() => {
                        this.swiper.swipeTop();
                        }}>
                        <FontAwesome name="hourglass-1" size={20} style={styles.iconPic}/>
                        </TouchableOpacity> */}
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

export default connect(state => state) (TinderView);