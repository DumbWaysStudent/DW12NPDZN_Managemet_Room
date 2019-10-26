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


export default class EditCustomer extends Component{

  constructor(props){
      super(props);
      this.state = {
        id: null,
        token: null,
        name: this.props.navigation.getParam('name'),
        identity_number: this.props.navigation.getParam('identityNumber'),
        phone_number: this.props.navigation.getParam('phoneNumber'),
        customerId: this.props.navigation.getParam('customerId')
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

  EditCustomer = () => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
      },
      url: `${config.API_URL}/customer/${this.state.customerId}`,
      data: {
        name: this.state.name,
        identity_number: this.state.identity_number,
        phone_number: this.state.phone_number,
        image: ''
      }
    }).then(res => {
      this.props.navigation.navigate('Customer')
    })
  }

 

  render(){

    return(
      <Container>
        <Content>
          <View>
            <Text>Edit Customer</Text>
            
            <Text>Name</Text>
            <TextInput
              placeholder=''
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
            <Text>Identity Number</Text>
            <TextInput
              placeholder=''
              value={this.state.identity_number}
              onChangeText={identity_number => this.setState({ identity_number })}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
            <Text>Phone Number</Text>
            <TextInput
              placeholder=''
              value={this.state.phone_number}
              onChangeText={phone_number => this.setState({ phone_number })}
              style= {{borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize:20, textAlign:'center'}}
            />
          </View>
          <View>
            <Row>
              <Button onPress={() => this.props.navigation.navigate('Customer')}><Text>Cancel</Text></Button>
              <Button onPress={() => this.EditCustomer()}><Text>Save</Text></Button>
            </Row>    
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

})