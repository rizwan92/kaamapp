import React, { Component } from 'react';
import {TouchableWithoutFeedback, BackHandler ,FlatList, AsyncStorage, Image ,View,Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right ,Left , Body , Button, Thumbnail, ListItem } from 'native-base';
import Meteor, { createContainer } from 'react-native-meteor';
import moment from 'moment';

class HomeScreen extends Component {

  callNumber = (url) =>{
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
      { this.props.todosReady ? <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}><Image source={require('../images/loading1.gif')} style={{width:150,height:150}} /></View>:
        <Content>
        <FlatList
            data={this.props.jobs}
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>{
             return(
               <Card>
                  <CardItem>
                  <Left>
                  <TouchableWithoutFeedback onPress={()=>{navigate('ProfileScreen')}}>
                  <Thumbnail source={item.userdetail.image == '' ? require('../images/noimage.jpg') : {uri:item.userdetail.image}}/>
                  </TouchableWithoutFeedback>
                    <Body>
                      <Text onPress={()=>{navigate('ProfileScreen')}} style={{ fontFamily: 'sans-serif-light'}}>{item.title}</Text>
                      <Text note style={{ fontFamily: 'sans-serif-light',fontSize:12}}>{item.location}</Text>
                    </Body>
                  </Left>
                  </CardItem>
                  <CardItem>
                  <Body>
                    <Text style={{ margin:4,fontFamily: 'sans-serif-light',fontSize:12}}><Text style={{fontWeight:'bold',fontFamily: 'sans-serif-light',fontSize:12}}>Qualification:</Text> {item.qualification}</Text>
                    <Text style={{ margin:4,fontFamily: 'sans-serif-light',fontSize:12}}><Text style={{fontWeight:'bold',fontFamily: 'sans-serif-light',fontSize:12}}>Experience:</Text> {item.experience}</Text>
                    <Text style={{ margin:4,fontFamily: 'sans-serif-light',fontSize:12}}><Text style={{fontWeight:'bold',fontFamily: 'sans-serif-light',fontSize:12}}>Skills:</Text> {item.skills}</Text>
                    <Text style={{ margin:4,fontFamily: 'sans-serif-light',fontSize:12}}><Text style={{fontWeight:'bold',fontFamily: 'sans-serif-light',fontSize:12}}>Salary:</Text> {item.salary}</Text>
                    <Text style={{ margin:4,fontFamily: 'sans-serif-light',fontSize:12}}><Text style={{fontWeight:'bold',fontFamily: 'sans-serif-light',fontSize:15,color:'blue'}} onPress={()=> this.callNumber(`tel:+91${item.userdetail.number}`)}>Press to Call:</Text> {item.userdetail.number+'/'+item.userdetail.phon}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Right>
                    <Text style={{ fontFamily: 'sans-serif-light',fontSize:10}}>Post :  {moment(item.createdAt).fromNow()}</Text>
                  </Right>
                </CardItem>
                </Card>
              )
            }
            }
            />
        </Content>
      }
      </Container>
    );
  }
}
export default createContainer(params=>{
  const handle = Meteor.subscribe('alljobs');

  return {
    todosReady: !handle.ready(),
    jobs: Meteor.collection('jobs').find({},{sort:{createdAt:-1}}),
  };
}, HomeScreen)
