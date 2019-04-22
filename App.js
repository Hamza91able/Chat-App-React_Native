import React from 'react';
import { Font, AppLoading } from 'expo';
import {
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {
  Fab,
  Root,
  Icon,
  Button,
  View,
  Text,
  Body,
  Title,
  Subtitle,
} from 'native-base'
import { fetchChats } from './constants/api';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import TopHeader from './screens/Header';
import HomeScreen from './screens/HomeScreen';
import StatusScreen from './screens/StatusScreen';
import ContactScreen from './screens/ContactsScreen';

export default class App extends React.Component {

  static defaultProps = {
    fetchChats
  }

  state = {
    loading: true,
    chats: [],
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  async componentDidMount() {

    const data = await this.props.fetchChats();

    setTimeout(() => {
      this.setState({
        loading: false, chats: data.chats
      });
    }, 2000);
  }

  test = () => {
    console.log(this.props)
    // () => this.props.navigation.navigate('Contacts')
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }

    return (
      <React.Fragment>
        {/* <TopHeader /> */}
        <AppContainer />
        {/* {this.renderFab()} */}
      </React.Fragment>
    )
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Settings: StatusScreen,
  }, {
    defaultNavigationOptions: {
      tabBarOptions: {
        style: {
          backgroundColor: '#128c7e',
        }
      }
    }
  }
);

const ContactStack = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Chat App',
        headerRight: <Button transparent><Icon style={{ color: 'white' }} name='more' /></Button>,
        headerStyle: {
          backgroundColor: '#128c7e',
          elevation: null
        },
        headerTitleStyle: {
          color: 'white'
        }
      }
    }
  },
  Contacts: {
    screen: ContactScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: <Body style={{ marginLeft: -150 }}>
          <Title>Select contacts</Title>
          <Subtitle style={{ marginLeft: -50 }}>124 contacts</Subtitle>
        </Body>,
        headerRight: <React.Fragment>
          <Button style={{ marginTop: 4 }} transparent>
            <Icon style={{ color: 'white' }} name='search' />
          </Button>
          <Button style={{ marginTop: 4 }} transparent>
            <Icon style={{ color: 'white' }} name='more' />
          </Button>
        </React.Fragment>,
        headerStyle: {
          backgroundColor: '#128c7e',
          elevation: null
        },
        headerTitleStyle: {
          color: 'white'
        }
      }
    }
  }
})

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: ContactStack
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: null,
        headerTitle: 'Chat App',
        headerRight: <Button transparent><Icon style={{ color: 'white' }} name='more' /></Button>,
        headerStyle: {
          backgroundColor: '#128c7e',
          elevation: null
        },
        headerTitleStyle: {
          color: 'white'
        }
      }
    }
  }, {
    headerMode: 'screen',
  }, {

  }
);

const AppSwitchNavigator = createSwitchNavigator({
  // Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: DashboardStackNavigator },
});



const AppContainer = createAppContainer(AppSwitchNavigator);
