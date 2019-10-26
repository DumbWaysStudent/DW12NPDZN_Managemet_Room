import React, {Component} from 'react';

import {
  Container, 
  Content, 
  View, 
  Text, 
  Fab,
  Item, 
  Input, 
  Header,
  Row,
  Icon,  
  } 
  from 'native-base';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import {connect} from 'react-redux'
import * as act from '../_actions/room'

class Room extends Component{
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
    this.showRoom()
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showRoom()
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

  showRoom = () => {
    this.props.getRoom(id = this.state.id, token = this.state.token)
    console.log(this.props.room, ">>>>>>>...")
  }

  render(){
    

    return(
      <Container>
        <View style={{ flex: 1 }}>
        
        <Content>
          
          <View>
          <FlatList
            data = {this.props.room.room}
            keyExtractor = {item => item.id}
            renderItem = {({item}) => 
            <View style={{borderWidth: 1}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditRoom',{
                  roomId: item.id,
                  name: item.name
                })}
              >
                  <Text>{item.name}</Text>
              </TouchableOpacity> 
            </View>
            }/>  
            <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddRoom')}
            >
              <Text>tambah</Text>
            </TouchableOpacity> 
                
           
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
    room: state.room
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getRoom: (id,token) => dispatch(act.getRoom(id,token))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)

const styles = StyleSheet.create({

})