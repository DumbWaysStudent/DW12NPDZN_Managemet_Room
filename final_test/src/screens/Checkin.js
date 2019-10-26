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


class Checkin extends Component{

  constructor(){
    super();
    this.state = {
      id: null,
      token: null,
      orderList: []
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
    this.setState({orderList: this.props.order.order.map(res => res.room_id)})
    this.props.getRoom(id = this.state.id, token = this.state.token)
    console.log(this.state.orderList, ">>>>>>>...")
    console.log(this.props.order, ">>>>>>>...")
    console.log(this.props.room, ">>>>>>>...")
  }

  render(){

    return(
      <Container>
        <Content>
          <View>
            
            <View>
              <FlatList
              data = {this.props.room.room}
              keyExtractor = {item => item.id}
              renderItem = {({item}) => 
              <View>
                {this.state.orderList.includes(item.id)?
                (<View style={{borderWidth: 1, backgroundColor: '#42f58a'}}>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('EditRoom',{
                    //   roomId: item.id,
                    //   name: item.name
                    // })}
                  >
                      <Text>{item.name}</Text>
                  </TouchableOpacity> 
                </View>):
                (<View style={{borderWidth: 1, backgroundColor: '#bac2bd'}}>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('EditRoom',{
                    //   roomId: item.id,
                    //   name: item.name
                    // })}
                  >
                      <Text>{item.name}</Text>
                  </TouchableOpacity> 
                </View>)}
                
                
              </View>
            }/>  
            </View>
          </View>
        </Content>
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

})