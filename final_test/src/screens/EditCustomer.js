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

  static navigationOptions = ({ navigation }) => {
    return {
        title: "Edit Customer",
        headerStyle: {
            backgroundColor: '#5dadec',
            },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      };
    }


  render(){

    return(
      <Container>
        <View style={{ flex: 1, backgroundColor: '#f27980', justifyContent: 'center'}}>
          <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={{flex: 1, justifyContent: 'center'}}>  
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder=''
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
                style= {styles.TextInput}
              />
              <Text style={styles.label}>Identity Number</Text>
              <TextInput
                placeholder=''
                value={this.state.identity_number}
                onChangeText={identity_number => this.setState({ identity_number })}
                style= {styles.TextInput}
              />
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder=''
                value={this.state.phone_number}
                onChangeText={phone_number => this.setState({ phone_number })}
                style= {styles.TextInput}
              />
              <View style={styles.buttonContainer}>
                <Row>
                  <Button style={styles.ButtonCancel} onPress={() => this.props.navigation.navigate('Customer')}><Text>Cancel</Text></Button>
                  <Button style={styles.ButtonSave} onPress={() => this.EditCustomer()}><Text>Save</Text></Button>
                </Row>    
              </View>
            </View>
            
          </Content>
        </View>
        
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2, 
    borderColor: 'black', 
    marginTop: 5, 
    borderRadius: 10, 
    backgroundColor: 'white',
    fontSize:20, 
    paddingHorizontal: 10
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  ButtonCancel: {
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#883444'
  },
  ButtonSave: {
    marginHorizontal: 5,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0061b0'
  }
})