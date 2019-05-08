import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class BurgerMenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.onBurgerMenuPress = this.onBurgerMenuPress.bind(this);
    }
    onBurgerMenuPress () {
        this.props.navigation.openDrawer();
    }
    render() {
        return (
        <TouchableOpacity
        onPress={this.onBurgerMenuPress}
        >
            <Entypo name="menu" size={25} color='black' style={{marginLeft:20}}/>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold'
    }
});
export default withNavigation(BurgerMenuButton);