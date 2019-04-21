import React from 'react';
import {
    StyleSheet,
    Platform,
    StatusBar,
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

    renderHeader = () => {
        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Select contacts</Title>
                    <Subtitle>124 contacts</Subtitle>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='search' />
                    </Button>
                    <Button transparent>
                        <Icon name='more' />
                    </Button>
                </Right>
            </Header>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderHeader()}
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
