import React from 'react';
import { Font, AppLoading } from 'expo';
import {
  StyleSheet,
  Platform,
  StatusBar,
  InteractionManager,
} from 'react-native';
import {
  Fab,
  Root,
  Icon,
  Button,
  View,
  Left,
  Text,
  Body,
  Title,
  Subtitle,
  Thumbnail,
  ListItem,
  CardItem,
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
import Chat from './screens/Chat';
import Login from './screens/Login';
import firebase from './constants/Firebase';

export default class App extends React.Component {

  static defaultProps = {
    fetchChats
  }

  state = {
    loading: true,
    chats: [],
    Avatar: "https://static.scientificamerican.com/blogs/cache/file/D4C437D8-244E-4582-BF1A158A7330AD33_source.jpg?w=590&h=800&B039F14E-190A-42BE-BA73A8D60DD542A5",
    Name: 'Hamza',
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  async componentDidMount() {
    const data = await this.props.fetchChats();

    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team

      setTimeout(() => {
        this.setState({
          loading: false, chats: data.chats
        });
      }, 2000);
    });
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
        {/* <AppContainer /> */}
        <Login />
      </React.Fragment>
    )
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Status: StatusScreen,
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
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle:
          <CardItem style={{ backgroundColor: '#128c7e' }}>
            <Left>
              <Thumbnail small source={{ uri: `${new App().state.Avatar}` }} />
              <Body>
                <Text style={{ color: 'white' }}>{new App().state.Name}</Text>
                <Text note style={{ color: 'white' }}>Last Seen: value</Text>
              </Body>
            </Left>
          </CardItem>,
        headerRight: <React.Fragment>
          <Button style={{ marginTop: 10 }} transparent>
            <Icon style={{ color: 'white' }} name='more' />
          </Button>
        </React.Fragment>,
        headerStyle: {
          backgroundColor: '#128c7e',
          elevation: null,
          height: 65,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }
    }
  },

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
  Dashboard: { screen: DashboardStackNavigator },
});



const AppContainer = createAppContainer(AppSwitchNavigator);
