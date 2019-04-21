
import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';
import { Header, Body, Right, Button, Icon, Title } from 'native-base';

export default class HeaderExample extends Component {
    render() {
        return (
            <Header style={styles.header}>
                <Body>
                    <Title style={{ marginLeft: 10 }}>Chat Application</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='more' />
                    </Button>
                </Right>
            </Header>
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