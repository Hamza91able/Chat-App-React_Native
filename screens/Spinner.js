import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';

export default class SpinnerExample extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Spinner style={{ marginTop: 300 }} color='blue' />
                </Content>
            </Container>
        );
    }
}