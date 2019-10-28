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
  Title,
  Row,
  Icon,  

  } 
  from 'native-base';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import {connect} from 'react-redux'
import * as act from '../_actions/room'


class Checkin extends Component{

  constructor(){
    super();
    this.state = {
      id: null,
      token: null,
      // orderList: []
    }
  }

  async componentDidMount(){
    await this.getToken()
    await this.getId()
    this.showOrder()
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showOrder()
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

  showOrder = () => {
    this.props.getOrder(id = this.state.id, token = this.state.token)
  }

  render(){

    return(
      <Container>
        <View style={{ flex: 1, backgroundColor: '#f27980'}}>
          <Header style={{backgroundColor: "#5dadec" }}>
            <Body style={{alignItems: 'center'}}>
                <Title style={{fontWeight: 'bold', color:'black'}}>Check In</Title>
            </Body>
          </Header>
          <Content padder >
            <View>  
              <View style={{flex:1, alignItems: "center"}}>
                <FlatList
                data = {this.props.order.order}
                keyExtractor = {item => item.id}
                numColumns={3}
                renderItem = {({item}) => 
                <View >
                  {item.customer.length > 0 ?
                  (<View style={[styles.card,{backgroundColor: '#bac2bd'}]}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Checkout',{
                        roomId: item.id,
                        name: item.name
                      })}
                    >
                        <Text style={styles.roomText}>{item.name}</Text>
                    </TouchableOpacity> 
                  </View>):
                (<View style={[styles.card, {backgroundColor: '#42f58a'}]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AddCheckin',{
                      roomId: item.id,
                      name: item.name
                    })}
                  >
                      <Text style={styles.roomText}>{item.name}</Text>
                  </TouchableOpacity> 
                </View>)
                }
                </View>
              }/>  
              </View>
            </View>
          </Content>
        </View>
      </Container>
    )
  }
}


const mapStateToProps = state => {
  return {
    order: state.order,
    room: state.room
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getOrder: (id,token) => dispatch(act.getOrder(id,token)),
    getRoom: (id,token) => dispatch(act.getRoom(id,token))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkin)

const styles = StyleSheet.create({
  card: {
    width: 120, 
    margin: 5,
    height: 120,
    justifyContent: 'center',
    borderRadius: 10
  },
  roomText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#5e5757',
    fontWeight: 'bold'
  }
})