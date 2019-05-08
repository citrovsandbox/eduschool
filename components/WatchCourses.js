import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // 6.2.2
import { withNavigation } from 'react-navigation';

class CreateNewAuditButton extends React.Component {
    constructor(props) {
        super(props);
        this.onCreateAuditPress = this.onCreateAuditPress.bind(this);
    }

    onCreateAuditPress () {
        this.props.navigation.navigate('Courses');
    }
    render() {
        return (
        <TouchableOpacity
        onPress={this.onCreateAuditPress}>
            <AntDesign name="eye" size={25} color='black' style={{marginRight:20}}/>
        </TouchableOpacity>
        );
    }
}

export default withNavigation(CreateNewAuditButton);