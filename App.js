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
  Text
} from 'native-base'
import { fetchChats } from './constants/api';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';


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
    console.log("TEST");
  }

  renderFab = () => {
    return (
      <View style={{ flex: 1 }}>
        <Fab
          direction="up"
          onPress={this.test}
          style={{ backgroundColor: '#128c7e' }}
          position="bottomRight">
          <Icon name="text" />
        </Fab>
      </View>
    )
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
        <TopHeader />
        <AppContainer />
        {this.renderFab()}
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

const AppContainer = createAppContainer(TabNavigator);
