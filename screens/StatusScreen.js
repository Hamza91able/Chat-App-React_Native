import React from 'react';
import {
    Text,
    View,
} from 'native-base'

export default class StatusScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Status!</Text>
            </View>
        );
    }
}
