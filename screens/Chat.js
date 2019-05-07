import React from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';

import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {

    render() {
        return (
            <React.Fragment>
                {console.log("TEST")}
                <GiftedChat />
            </React.Fragment>
        );
    }
}

