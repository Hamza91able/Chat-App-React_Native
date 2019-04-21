import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { fetchChats } from './constants/api';

export default class App extends React.Component {

  static defaultProps = {
    fetchChats
  }

  state = {
    loading: false,
    chats: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const data = await this.props.fetchChats();

    setTimeout(() => {
      this.setState({
        loading: false, chats: data.chats
      });
    }, 2000);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Chat Application</Text>
        {this.state.chats.map((chat, i) => {
          return (
            <Text key={i}>{chat.title}</Text>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
