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
import Modal from 'react-native-modalbox';
import { TextInput } from 'react-native-gesture-handler';
import config from '../../config-env'
import axios from 'axios'
import {connect} from 'react-redux'
import * as act from '../_actions/room'



class Customer extends Component{

  constructor(){
    super();
    this.state = {
      token: null,
      name: '',
      identity_number: '',
      phone_number: '',
      customerId: null
    }
  }

  async componentDidMount(){
    await this.getToken()
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


  showCustomer = () => {
    this.props.getCustomer(token = this.state.token)
    console.log(this.props.customer, ">>>>>>>...")
  }

  AddCustomer = () => {
    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
      },
      url: `${config.API_URL}/customer`,
      data: {
        name: this.state.name,
        identity_number: this.state.identity_number,
        phone_number: this.state.phone_number
      }
    }).then(res => {
      this.refs.modalAddCustomer.close()
      this.showCustomer()
    })
  }

  handleModalEdit = (customerId,name,identity_number,phone_number ) => {
    this.setState({
      customerId,
      name,
      identity_number,
      phone_number,
    })
    this.refs.modalEditCustomer.open()
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
      this.refs.modalEditCustomer.close()
      this.showCustomer()
    })
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
                    onPress={() => this.handleModalEdit(item.id, item.name, item.identity_number, item.phone_number)}
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
            <TouchableOpacity onPress={() => this.refs.modalAddCustomer.open()}>
              <Icon type="FontAwesome" name="plus" style={{color: "white" }}/>
            </TouchableOpacity>
          </Fab>
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalAddCustomer"}>
            <View style={{position: "absolute", width: 250}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Add Customer</Text>
              </View>
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder=''
                  onChangeText={name => this.setState({ name })}
                  style= {styles.TextInput}
                />
                <Text style={styles.label}>Identity Number</Text>
                <TextInput
                  placeholder=''
                  onChangeText={identity_number => this.setState({ identity_number })}
                  style= {styles.TextInput}
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder=''
                  onChangeText={phone_number => this.setState({ phone_number })}
                  style= {styles.TextInput}
                />
                <View style={{alignItems: 'center'}}>
                  <Row>
                    <Button 
                      style={styles.ButtonCancel} 
                      onPress={() => this.refs.modalAddCustomer.close()}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button 
                      style={styles.ButtonSave} 
                      onPress={() => this.AddCustomer()}
                    >
                        <Text>Save</Text>
                    </Button>
                  </Row>  
                </View>      
              </View>
            </View>
          </Modal>
          <Modal 
            style={styles.modal} 
            position={"center"} 
            ref={"modalEditCustomer"}>
            <View style={{position: "absolute", width: 250}}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Edit Customer</Text>
              </View>
              <View>
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
                <View style={{alignItems: 'center'}}>
                  <Row>
                    <Button 
                      style={styles.ButtonCancel} 
                      onPress={() => this.refs.modalEditCustomer.close()}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button 
                      style={styles.ButtonSave} 
                      onPress={() => this.EditCustomer()}
                    >
                        <Text>Save</Text>
                    </Button>
                  </Row>  
                </View>      
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
    customer: state.customer
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getCustomer: (token) => dispatch(act.getCustomer(token))
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
    marginBottom: 5, 
    borderRadius: 10, 
    fontSize:15, 
    paddingLeft: 10
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold'
  },
})