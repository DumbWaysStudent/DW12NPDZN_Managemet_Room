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
import { StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import {connect} from 'react-redux'
import * as act from '../_actions/room'



class Customer extends Component{

  constructor(){
    super();
    this.state = {
      id: null,
      token: null
    }
  }

  async componentDidMount(){
    await this.getToken()
    await this.getId()
    this.showCustomer()
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showCustomer()
    })
    
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

  showCustomer = () => {
    this.props.getCustomer(id = this.state.id, token = this.state.token)
    console.log(this.props.customer, ">>>>>>>...")
  }

  render(){

    return(
      <Container>
        <Content>
          <View>
            
            <View>
            <FlatList
              data = {this.props.customer.customer}
              keyExtractor = {item => item.id}
              renderItem = {({item}) => 
              <View>
                <TouchableOpacity   
                  onPress={() => this.props.navigation.navigate('EditCustomer',{
                    customerId: item.id,
                    name: item.name,
                    phoneNumber: item.phone_number,
                    identityNumber: item.identity_number
                  })}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.identity_number}</Text>
                  <Text>{item.phone_number}</Text>
                </TouchableOpacity> 
              </View>
              }/>  
              <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AddCustomer')}
                  >
                  <Text>tambah</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    customer: state.customer
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getCustomer: (id,token) => dispatch(act.getCustomer(id,token))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer)

const styles = StyleSheet.create({

})