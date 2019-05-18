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
    Card,
    Content,
    CardItem,
    Text,
    Item,
    Input
} from 'native-base'

export default class ContactScreen extends React.Component {

    state = {
        phoneNo: undefined,
    }

    componentDidMount() {
        // 1: Component is mounted off-screen
        InteractionManager.runAfterInteractions(() => {
            // 2: Component is done animating
            // 3: Start fetching the team
        });
    }

    //Temporary Direct Adding Method.
    renderContactAdd = () => {
        return (
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>
                                Enter phone number to add into contacts.
                            </Text>
                            <Item>
                                <Input onChange={event => this.setState({ phoneNo: event.nativeEvent.text })} placeholder="Phone No" />
                            </Item>
                            <Button success><Text>Success</Text></Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderContactAdd()}
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
