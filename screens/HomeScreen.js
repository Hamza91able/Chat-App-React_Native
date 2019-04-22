import React from 'react';
import {
    Text,
    View,
    Button,
    Fab,
    Icon,
} from 'native-base'

export default class HomeScreen extends React.Component {

    renderFab = () => {
        return (
            <View style={{ flex: 1 }}>
                <Fab
                    direction="up"
                    onPress={() => this.props.navigation.navigate('Contacts')}
                    style={{ backgroundColor: '#128c7e' }}
                position="bottomRight">
                    <Icon name="text" />
                </Fab>
            </View >
        )
    }

    render() {
        return (
            <React.Fragment>
                <Text>Home!</Text>
                {this.renderFab()}
            </React.Fragment>
        );
    }
}