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
import { StyleSheet, FlatList, Picker, TouchableOpacity, ScrollView, Dimensions, Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modalbox';
import {connect} from 'react-redux'
import * as act from '../_actions/room'
import config from '../../config-env'
import axios from 'axios'
import CountDown from 'react-native-countdown-component'

class Checkin extends Component{

  constructor(){
    super();
    this.state = {
      token: null,
      name: '',
      roomId: null,
      duration: null,
      durationCO: 0,
      customerId: null,
      customer: '',
      orderId: null
    }
  }

  async componentDidMount(){
    await this.getToken()
    this.showOrder()
    this.showCustomer()
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showOrder()
      this.showCustomer()
    })
    
  }

  async getToken () {
    const getToken = await AsyncStorage.getItem('token')
      this.setState({
        token: getToken
      })    
  }


  showOrder = () => {
    this.props.getOrder(token = this.state.token)
  }

  showCustomer = () => {
    this.props.getCustomer(token = this.state.token)
  }

  handleModalCheckin = (name,roomId) => {
    this.setState({
      name,
      roomId 
    })
    this.refs.modalCheckin.open()
  } 

  checkin = () => {
    this.props.checkin(token=this.state.token, roomId=this.state.roomId, customerId=this.state.customerId, duration=this.state.duration)
    this.refs.modalCheckin.close()
      this.setState({
        duration: null
      })
  }

  handleModalCheckout = (name,roomId,customer,customerId,orderId,durationCO) => {
    this.setState({
      name,
      roomId,
      customer,
      customerId,
      orderId,
      durationCO
    })
    this.refs.modalCheckout.open()
  } 

  checkout = () => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
      },
      url: `${config.API_URL}/order/${this.state.orderId}`,
      data: {
        room_id: this.state.roomId,
        customer_id: this.state.customerId,
        duration: this.state.duration
      }
    }).then(res => {
      this.refs.modalCheckout.close()
      this.setState({
        durationCO: 0
      })
      this.showOrder()
    })  
  }

  checkoutTimer = (orderId) => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
      },
      url: `${config.API_URL}/order/${orderId}`,
      data: {}
    }).then(res => {
      this.showOrder()
    })  
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
                  {item.customers.length > 0 ?
                  (<View style={[styles.card,{backgroundColor: '#bac2bd'}]}>
                    <TouchableOpacity
                     
                      onPress={() => this.handleModalCheckout(item.name, item.id, item.customers[0].name, item.customers[0].id, item.customers[0].orders.id, item.customers[0].orders.duration)}
                    >
                      <Text style={styles.roomText}>{item.name}</Text>
                    </TouchableOpacity> 
                    <CountDown
                      until={(item.customers[0].orders.duration)*60}
                      size={10}
                      digitStyle={styles.digitStyle}
                      timeToShow={['M','S']}
                      timeLabels={{}}
                      onFinish={() => this.checkoutTimer(item.customers[0].orders.id)}
                    />
                  </View>):
                (<View style={[styles.card, {backgroundColor: '#42f58a'}]}>
                  <TouchableOpacity
                    onPress={() => this.handleModalCheckin(item.name, item.id)}
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
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalCheckin"}>
            <View style={{position: "absolute", width: 250}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Add Check In</Text>
              </View>
              <View>
                <Text style={styles.label}>Room Name</Text>
                <TextInput
                  placeholder='Room Name'
                  value={this.state.name}
                  editable={false}
                  style= {styles.TextInput}
                />
                <Text style={styles.label}>Customer</Text>
                <View style={styles.TextInput}>
                  <Picker
                    selectedValue={this.state.customerId}
                    onValueChange={(itemValue) => 
                      this.setState({
                        customerId: itemValue
                      }) 
                    }
                  >
                    {this.props.customer.customer.map((item)=> {
                      return <Picker.Item  key={item.id} value={item.id} label={item.name}/>
                    })}
                  </Picker>
                </View>
                <Text style={styles.label}>Duration (minutes)</Text>
                <TextInput
                  keyboardType="numeric"
                  value={this.state.duration}
                  onChangeText={duration => this.setState({ duration })}
                  style= {styles.TextInput}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Row>
                  <Button 
                    style={styles.ButtonCancel} 
                    onPress={() => this.refs.modalCheckin.close()}
                  >
                    <Text>Cancel</Text>
                  </Button>
                  <Button
                    style={styles.ButtonSave}
                    onPress={()=>this.checkin()}
                  >
                    <Text>Check In</Text>
                  </Button>
                </Row>    
              </View>
            </View>
          </Modal>
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalCheckout"}>
            <View style={{position: "absolute", width: 250}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Check Out</Text>
              </View>
              <View>
                <Text style={styles.label}>Room Name</Text>
                <TextInput
                  value={this.state.name}
                  editable={false}
                  style= {styles.TextInput}
                />
                <Text style={styles.label}>Customer</Text>
                <TextInput
                  value={this.state.customer}
                  editable={false}
                  style= {styles.TextInput}
                />
                <Text style={styles.label}>Duration (minutes)</Text>
                <TextInput
                  value={this.state.durationCO.toString()}
                  editable={false}
                  style= {styles.TextInput}
                />
                
              </View>
              <View style={{alignItems: 'center'}}>
                <Row>
                  <Button 
                    style={styles.ButtonCancel} 
                    onPress={() => this.refs.modalCheckout.close()}
                  >
                    <Text>Cancel</Text>
                  </Button>
                  <Button
                    style={styles.ButtonSave}
                    onPress={()=>this.checkout()}
                  >
                    <Text>Check Out</Text>
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
    order: state.order,
    room: state.room,
    customer: state.customer
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getOrder: (token) => dispatch(act.getOrder(token)),
    getRoom: (token) => dispatch(act.getRoom(token)),
    getCustomer: (token) => dispatch(act.getCustomer(token)),
    checkin: (token,roomId,customerId,duration) => dispatch(act.checkin(token,roomId,customerId,duration))
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
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f27980',
    height: 420,
    width: 320,
    borderRadius: 10
  },
  ButtonCancel: {
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#883444'
  },
  ButtonSave: {
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0061b0'
  },
  TextInput: {
    backgroundColor: 'white' ,
    borderWidth: 1, 
    borderColor: 'black', 
    marginBottom: 5, 
    borderRadius: 10, 
    fontSize:15, 
    textAlign: 'center'
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold'
  },
  digitStyle: {
    backgroundColor: '#FFF', 
    marginBottom: -28, 
    marginTop: 2
  }
})