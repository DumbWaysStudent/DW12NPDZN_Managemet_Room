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
  Body,
  Fab,
  Title,
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
        <View style={{ flex: 1, backgroundColor: '#f27980'}}>
          <Header style={{backgroundColor: "#5dadec" }}>
            <Body style={{alignItems: 'center'}}>
                <Title style={{fontWeight: 'bold', color:'black'}}>Customer</Title>
            </Body>
          </Header>
          <Content padder>
            <View>
              <View >
              <FlatList
                data = {this.props.customer.customer}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => 
                <View style={styles.card}>
                  <TouchableOpacity   
                    onPress={() => this.props.navigation.navigate('EditCustomer',{
                      customerId: item.id,
                      name: item.name,
                      phoneNumber: item.phone_number,
                      identityNumber: item.identity_number
                    })}
                  >
                    <Row>
                      <Image style={styles.Img} source={require('./user.png')}></Image>
                      <View style={{justifyContent: 'center', marginLeft: 5}}>
                        <Text style={styles.customer}>{item.name}</Text>
                        <Text style={styles.subCustomer}>{item.identity_number}</Text>
                        <Text style={styles.subCustomer}>{item.phone_number}</Text>
                      </View>
                    </Row>
                  </TouchableOpacity> 
                </View>
                }/>  
              </View>
            </View>
          </Content>
          <Fab
            style={{ backgroundColor: '#5dadec' }}
            position="bottomRight" 
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCustomer')}>
              <Icon type="FontAwesome" name="plus" style={{color: "white" }}/>
            </TouchableOpacity>
            
          </Fab>
        </View>
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
  card: {
    borderWidth: 1, 
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
  },
  customer: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subCustomer: {
    fontSize: 12
  },
  Img: {
    borderWidth: 1, 
    borderColor: "black", 
    alignSelf: 'center',
    margin: 5,
    width: 75, 
    height:75, 
    borderRadius: 100,
  },
})