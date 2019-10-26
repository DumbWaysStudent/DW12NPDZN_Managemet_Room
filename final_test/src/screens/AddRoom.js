import React, {Component} from 'react';
import {
  Container, 
  Content, 
  View, 
  Text, 
  Item, 
  Input, 
  Button, 
  Header,
  Row,
  Icon,  
  } 
  from 'native-base';
import { StyleSheet, ScrollView, Dimensions, Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import config from '../../config-env'
import AsyncStorage from '@react-native-community/async-storage'


export default class AddRoom extends Component{

  constructor(){
      super();
      this.state = {
        id: null,
        token: null,
        name: ''
      }
    }
  
  
  async componentDidMount(){
    await this.getToken()
    await this.getId()
  }

  async getToken () {
    const getToken = await AsyncStorage.getItem('token')
      this.setState({
        token: getToken
      })    
  }

  async getId () {
    await AsyncStorage.getItem('id').then(key=>
      this.setState({
        id: JSON.parse(key)
      }))
  }

  AddRoom = () => {
    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
      },
      url: `${config.API_URL}/room`,
      data: {
        name: this.state.name,
      }
    }).then(res => {
      this.props.navigation.navigate('Room')
    })
  }

 

  render(){

    return(
      <Container>
        <Content>
          <View>
            <Text>Add Room</Text>
            <Text>Room Name</Text>
            <TextInput
              placeholder='Room Name'
              onChangeText={name => this.setState({ name })}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
          </View>
          <View>
            <Row>
              <Button onPress={() => this.props.navigation.navigate('Room')}><Text>Cancel</Text></Button>
              <Button onPress={() => this.AddRoom()}><Text>Save</Text></Button>
            </Row>    
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

})