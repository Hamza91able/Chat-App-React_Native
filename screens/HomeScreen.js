import React from 'react';
import {
    Text,
    View,
    Button,
    Fab,
    Icon,
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Left,
    Thumbnail,
    ListItem,
    Right
} from 'native-base'

export default class HomeScreen extends React.Component {

    state = {
        chatList: [
            { Name: "Hamza", LastMsg: "Hi", Time: "1:12 AM", Avatar: "https://static.scientificamerican.com/blogs/cache/file/D4C437D8-244E-4582-BF1A158A7330AD33_source.jpg?w=590&h=800&B039F14E-190A-42BE-BA73A8D60DD542A5" },
            { Name: "Ali", LastMsg: "??", Time: "Yesterday", Avatar: "https://previews.123rf.com/images/grgroup/grgroup1611/grgroup161103894/65282255-man-cartoon-with-beard-icon-male-avatar-person-human-and-people-theme-isolated-design-vector-illustr.jpg" },
            { Name: "Bilal", LastMsg: "You there?", Time: "Yesterday", Avatar: "https://i.pinimg.com/564x/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.jpg" },
            { Name: "Rabia", LastMsg: "Halo?", Time: "Yesterday", Avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png" },
            { Name: "Fatima", LastMsg: ":D", Time: "Yesterday", Avatar: "https://cdn.icon-icons.com/icons2/582/PNG/512/wonder-women_icon-icons.com_55030.png" },
            { Name: "Ahmed", LastMsg: "ok", Time: "Yesterday", Avatar: "https://www.maxpixel.net/static/photo/1x/Person-Hairstyle-Character-Man-Avatar-Male-Boy-1606916.png" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },
            { Name: "Usman", LastMsg: "haha", Time: "Yesterday", Avatar: "https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg" },

        ]
    }

    renderChatList = () => {

        const { chatList } = this.state;

        return (
            <Container>
                <Content>
                    <Card>
                        {chatList.map((chat, i) => {
                            return (
                                <ListItem onPress={() => this.props.navigation.navigate('Chat')} style={{ height: 70, width: '100%', marginLeft: -1 }} key={i}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail small source={{ uri: `${chat.Avatar}` }} />
                                            <Body>
                                                <Text>{chat.Name}</Text>
                                                <Text note>{chat.LastMsg}</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Text style={{ fontSize: 10 }}>{chat.Time}</Text>
                                        </Right>
                                    </CardItem>
                                </ListItem>
                            )
                        })}
                    </Card>
                </Content>
            </Container>
        )
    }

    renderFab = () => {
        return (
            <View>
                <Fab
                    direction="up"
                    onPress={() => this.props.navigation.navigate('Contacts')}
                    style={{ backgroundColor: '#128c7e', position: 'relative' }}
                    position="bottomRight">
                    <Icon name="text" />
                </Fab>
            </View>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderChatList()}
                {this.renderFab()}
            </React.Fragment>
        );
    }
}