import React from 'react';
import {
    View, ScrollView, TextInput
} from 'react-native';
import { Linking, WebBrowser } from 'expo'
import {
    Header,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Input,
    List,
    ListItem,
} from 'native-base';

import firebase from '../constants/Firebase';
import { createUser } from '../constants/api';
import HeaderTop from './Header';

// const captchaUrl = `https://workers-ef768.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`
const captchaUrl = `https://chatapplicationreactnative.firebaseapp.com/index.html?appurl=${Linking.makeUrl('')}`;

export default class Login extends React.Component {

    static defaultProps = {
        createUser
    }

    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: '',
            countryCode: null,
            phoneNumber: null,
            headerTitle: "Verify your phone number",
            showStep1: true,
            showStep2: false,
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        })
    }

    onPhoneChange = (phone) => {
        this.setState({ phone })
    }

    onPhoneComplete = async () => {
        let token = null
        const listener = ({ url }) => {
            WebBrowser.dismissBrowser()
            const tokenEncoded = Linking.parse(url).queryParams['token']
            if (tokenEncoded)
                token = decodeURIComponent(tokenEncoded)
        }

        Linking.addEventListener('url', listener)
        await WebBrowser.openBrowserAsync(captchaUrl)
        Linking.removeEventListener('url', listener)
        if (token) {
            const { phone } = this.state
            //fake firebase.auth.ApplicationVerifier
            const captchaVerifier = {
                type: 'recaptcha',
                verify: () => Promise.resolve(token)
            }
            try {
                const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
                this.setState({ confirmationResult, showStep1: false, showStep2: true, })
            } catch (e) {
                console.warn(e)
            }

        }
    }

    onCodeChange = (code) => {
        this.setState({ code })
    }

    onSignIn = async () => {
        const { confirmationResult, code, phone } = this.state
        try {
            await confirmationResult.confirm(code)
            await this.props.createUser(firebase.auth().currentUser.uid, phone);
        } catch (e) {
            alert(e);
        }
        // this.reset()
    }

    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    setPhone = () => {
        const { countryCode, phoneNumber } = this.state;

        this.setState({
            phone: `+${countryCode}${phoneNumber}`,
        }, () => {
            // alert(`Phone No: ${this.state.phone}`);
            this.onPhoneComplete()
        })
    }

    renderInfo = () => {
        return (
            <React.Fragment>
                <Container style={{ padding: 15 }}>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Chat Application will send a one time SMS message to verify your phone number.
                                        Carrier SMS charges may apply.
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </React.Fragment>
        )
    }

    renderPhoneNoSection = () => {
        return (
            <React.Fragment>
                <Container style={{ padding: 15, marginTop: -395 }}>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Please enter your area code and phone number.
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Input
                                                value="+"
                                                disabled
                                                style={{ justifyContent: 'flex-start', width: 20, }}
                                            />
                                        </View>
                                        <View>
                                            <Input
                                                keyboardType="numeric"
                                                maxLength={2} placeholder="92"
                                                style={{ borderBottomWidth: 1 }}
                                                name="countryCode"
                                                value={this.state.countryCode}
                                                onChange={event => this.setState({ countryCode: event.nativeEvent.text })}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Input
                                                keyboardType="numeric"
                                                maxLength={10}
                                                placeholder="0123456789"
                                                style={{ justifyContent: 'flex-end', marginLeft: 8, borderBottomWidth: 1, borderBottomColor: '#128c7e' }}
                                                name="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={event => this.setState({ phoneNumber: event.nativeEvent.text })}
                                            />
                                        </View>
                                        <View>
                                            <Button onPress={this.setPhone} light style={{ height: 40, marginTop: 10, marginLeft: 8 }}><Text>OK</Text></Button>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </React.Fragment>
        )
    }

    renderVerificationProcess = () => {
        return (
            <React.Fragment>
                <Container style={{ padding: 15 }}>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Please enter the 6 digits code sent to {this.state.phone}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ marginLeft: 100 }}>
                                            <Input
                                                keyboardType="numeric"
                                                maxLength={6}
                                                placeholder="------------"
                                                value={this.state.code}
                                                onChangeText={this.onCodeChange}
                                                style={
                                                    {
                                                        fontSize: 20,
                                                        marginLeft: 8,
                                                        borderBottomWidth: 3,
                                                        width: 100,
                                                        borderBottomColor: '#128c7e',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }
                                                }
                                            />
                                            <Input
                                                value="Enter 6-digit code"
                                                style={{ fontSize: 15 }}
                                            />
                                        </View>
                                        <View>
                                            <Button onPress={this.onSignIn} light style={{ height: 40, marginLeft: 8 }}><Text>OK</Text></Button>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </React.Fragment>
        )
    }

    render() {
        // if (this.state.user)
        //     return (
        //         this.props.navigation.navigate("Main")
        //     )

        // if (!this.state.confirmationResult)
        //     return (
        //         <ScrollView style={{ padding: 20, marginTop: 20 }}>
        //             <TextInput
        //                 value={this.state.phone}
        //                 onChangeText={this.onPhoneChange}
        //                 keyboardType="phone-pad"
        //                 placeholder="Your phone"
        //             />
        //             <Button
        //                 onPress={this.onPhoneComplete}
        //                 title="Next"
        //             />
        //         </ScrollView>
        //     )
        // else
        //     return (
        //         <ScrollView style={{ padding: 20, marginTop: 20 }}>
        //             <TextInput
        //                 value={this.state.code}
        //                 onChangeText={this.onCodeChange}
        //                 keyboardType="numeric"
        //                 placeholder="Code from SMS"
        //             />
        //             <Button
        //                 onPress={this.onSignIn}
        //                 title="Sign in"
        //             />
        //         </ScrollView>
        //     )

        const { showStep1, showStep2 } = this.state;
        console.log(this.state.user);

        return (
            <React.Fragment>
                <HeaderTop title={this.state.headerTitle} />
                {showStep1 && this.renderInfo()}
                {showStep1 && this.renderPhoneNoSection()}
                {showStep2 && this.renderVerificationProcess()}
            </React.Fragment>
        )
    }
}
