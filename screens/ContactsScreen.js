import React from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
    InteractionManager,
} from 'react-native';
import {
    Subtitle,
    Left,
    Header,
    Button,
    Icon,
    Right,
    Body,
    Title,
} from 'native-base'

export default class ContactScreen extends React.Component {

    componentDidMount() {
        // 1: Component is mounted off-screen
        InteractionManager.runAfterInteractions(() => {
            // 2: Component is done animating
            // 3: Start fetching the team
        });
    }

    render() {
        return (
            <React.Fragment>
                {/* {this.renderHeader()} */}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#128c7e",
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })
    }
});
