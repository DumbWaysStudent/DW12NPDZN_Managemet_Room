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
  Left,
  Right,
  Button,
  Body,
  Title,
  Icon,  
  } 
  from 'native-base';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList, Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modalbox';
import {connect} from 'react-redux'
import config from '../../config-env'
import * as act from '../_actions/room'
import axios from 'axios'


class Room extends Component{
  constructor(){
    super();
    this.state = {
      token: null,
      name: '',
      roomId: null,
    }
  }


  async componentDidMount(){
    await this.getToken()
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


  showRoom = () => {
    this.props.getRoom(token = this.state.token)
    console.log(this.props.room, ">>>>>>>...")
  }

  addRoom = () => {
    this.props.addRoom(token = this.state.token, name = this.state.name)
    this.refs.modalAdd.close()
  }

  handleModalEdit = (name,roomId) => {
    this.setState({
      name,
      roomId 
    })
    this.refs.modalEdit.open()
  } 

  editRoom = () => {
    this.props.editRoom(token = this.state.token, name = this.state.name, roomId=this.state.roomId)
    this.refs.modalEdit.close()
  }


  render(){
    return(
      <Container>
        <View style={{ flex: 1, backgroundColor: '#E7F2F8'}}>
          <Header style={{backgroundColor: "#537d91" }}>
            <Body style={{alignItems: 'center'}}>
                <Title style={{fontWeight: 'bold', color:'white'}}>Room</Title>
            </Body>
          </Header>  
          <Content padder>
            <View style={{alignItems: "center"}}>
            <FlatList
              data = {this.props.room.room}
              keyExtractor = {item => item.id}
              numColumns={3}
              renderItem = {({item}) => 
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => this.handleModalEdit(item.name, item.id)}
                >
                    <Text style={styles.roomText}>{item.name}</Text>
                </TouchableOpacity> 
              </View>
              }/>              
            </View>
            
          </Content>
          
          <Fab
            style={{ backgroundColor: '#537d91' }}
            position="bottomRight" 
          >
            <TouchableOpacity 
              onPress={() => this.refs.modalAdd.open()}
            >
              <Icon type="FontAwesome" name="plus" style={{color: "white"}}/>
            </TouchableOpacity>   
          </Fab>
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalAdd"}>
            <View style={{position: "absolute"}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Add Room</Text>
              </View>
              <View>
                <TextInput
                  placeholder='Room Name'
                  onChangeText={name => this.setState({ name })}
                  style= {styles.TextInput}
                />
                <Row>
                  <Button 
                    style={styles.ButtonCancel} 
                    onPress={() => this.refs.modalAdd.close()}
                  >
                    <Text>Cancel</Text>
                  </Button>
                  <Button 
                    style={styles.ButtonSave} 
                    onPress={() => this.addRoom()}
                  >
                      <Text>Save</Text>
                  </Button>
                </Row>    
              </View>
            </View>
          </Modal>
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalEdit"}>
            <View style={{position: "absolute"}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Edit Room</Text>
              </View>
              <View>
                <TextInput
                  placeholder='Room Name'
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
                  style= {styles.TextInput}
                />
                <Row>
                  <Button 
                    style={styles.ButtonCancel} 
                    onPress={() => this.refs.modalEdit.close()}
                  >
                    <Text>Cancel</Text>
                  </Button>
                  <Button 
                    style={styles.ButtonSave} 
                    onPress={() => this.editRoom()}
                  >
                      <Text>Save</Text>
                  </Button>
                </Row>    
              </View>
            </View>
          </Modal>
        </View> 
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    room: state.room,
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getRoom: (token) => dispatch(act.getRoom(token)),
    addRoom: (token,name) => dispatch(act.addRoom(token,name)),
    editRoom: (token,name,roomId) => dispatch(act.editRoom(token,name,roomId))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, 
    width: 120, 
    margin: 5,
    backgroundColor: 'white',
    height: 120,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#537d91',
  },
  roomText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#537d91',
    fontWeight: 'bold'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7F2F8',
    height: 200,
    width: 300,
    borderRadius: 10
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
  },
  TextInput: {
    backgroundColor: 'white' ,
    borderWidth: 1, 
    borderColor: 'black', 
    marginBottom: 15, 
    borderRadius: 10, 
    fontSize:15, 
    textAlign:'center'}
})