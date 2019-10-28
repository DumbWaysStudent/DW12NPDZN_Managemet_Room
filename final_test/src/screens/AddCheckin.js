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
import ModalDropdown from 'react-native-modal-dropdown';

export default class AddCheckin extends Component{

  constructor(props){
      super(props);
      this.state = {
        id: null,
        token: null,
        name: this.props.navigation.getParam('name'),
        roomId: this.props.navigation.getParam('roomId'),
        duration: null
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

//   EditRoom = () => {
//     axios({
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json',
//         'authorization': `Bearer ${this.state.token}`
//       },
//       url: `${config.API_URL}/room/${this.state.roomId}`,
//       data: {
//         name: this.state.name,
//       }
//     }).then(res => {
//       this.props.navigation.navigate('Room')
//     })
//   }

 

  render(){

    return(
      <Container>
        <Content>
          <View>
            <Text>Check In</Text>
            <Text>Room Name</Text>
            <TextInput
              placeholder='Room Name'
              value={this.state.name}
              editable={false}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
            <Text>Customer</Text>
            <ModalDropdown options={['option 1', 'option 2']}/>
            <Text>Duration (minutes)</Text>
            <TextInput
              placeholder=''
              value={this.state.duration}
              onChangeText={duration => this.setState({ duration })}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
          </View>
          <View>
            <Row>
              <Button onPress={() => this.props.navigation.navigate('Checkin')}><Text>Cancel</Text></Button>
              <Button><Text>Check In</Text></Button>
            </Row>    
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

})