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
import ImagePicker from 'react-native-image-picker';



class Customer extends Component{

  constructor(){
    super();
    this.state = {
      token: null,
      name: '',
      image: null,
      identity_number: '',
      phone_number: '',
      customerId: null,
      photo: null,
      photoEdit: null
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
  }

  addCustomer = async () => {
    await this.props.addCustomer(token=this.state.token, name= this.state.name, identity_number= this.state.identity_number, phone_number= this.state.phone_number, photo=this.state.photo)
    this.refs.modalAddCustomer.close()
    this.setState({photo: null})
  }

  cancelAdd = () => {
    this.setState({photo: null})
    this.refs.modalAddCustomer.close()
  }

  handleModalEdit = async (customerId,name,identity_number,phone_number,image ) => {
    await this.setState({
      customerId,
      name,
      identity_number,
      phone_number,
      image
    })
    this.refs.modalEditCustomer.open()
  } 

  editCustomer = async () => {
    await this.props.editCustomer(token=this.state.token, customerId=this.state.customerId ,name= this.state.name, identity_number= this.state.identity_number, phone_number= this.state.phone_number, photoEdit=this.state.photoEdit)
    this.setState({photoEdit: null})
    this.refs.modalEditCustomer.close()
  }

  cancelEdit = () => {
    this.setState({photoEdit: null})
    this.refs.modalEditCustomer.close()
  }


  choosePhoto = () => {
    const options = {
      noData: true,
      quality: 0.1,
      maxWidth: 500,
      maxHeight: 500,
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
        console.log(this.state.photo)
      }
    })
  }

  choosePhotoEdit = () => {
    const options = {
      noData: true,
      quality: 0.1,
      maxWidth: 500,
      maxHeight: 500,
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photoEdit: response })
      }
    })
  }
  
  render(){

    return(
      <Container>
        <View style={{ flex: 1, backgroundColor: '#E7F2F8'}}>
          <Header style={{backgroundColor: "#537d91" }}>
            <Body style={{alignItems: 'center'}}>
                <Title style={{fontWeight: 'bold', color:'white'}}>Customer</Title>
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
                    onPress={() => this.handleModalEdit(item.id, item.name, item.identity_number, item.phone_number, item.image)}
                  >
                    <Row>
                      {item.image == null?
                      (<Image style={styles.Img} source={require('./user.png')}></Image>):
                      (<Image style={styles.Img} source={{uri: item.image}}></Image>)}
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
            style={{ backgroundColor: '#537d91' }}
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
                <TouchableOpacity
                  onPress = {()=>this.choosePhoto()}
                >
                  {this.state.photo == null?
                  (<Image style={styles.ImgModal} source={require('./user.png')}></Image>):
                  (<Image style={styles.ImgModal} source={this.state.photo}></Image>)}
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <Row>
                      <Button 
                        style={styles.ButtonCancel} 
                        onPress={() => this.cancelAdd()}
                      >
                        <Text>Cancel</Text>
                      </Button>
                      <Button 
                        style={styles.ButtonSave} 
                        onPress={() => this.addCustomer()}
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
                <TouchableOpacity
                  onPress = {()=>this.choosePhotoEdit()}
                >
                  {this.state.photoEdit == null?
                  (<Image style={styles.ImgModal} source={{uri: this.state.image}}></Image>):
                  (<Image style={styles.ImgModal} source={this.state.photoEdit}></Image>)}
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <Row>
                    <Button 
                      style={styles.ButtonCancel} 
                      onPress={() => this.cancelEdit()}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button 
                      style={styles.ButtonSave} 
                      onPress={() => this.editCustomer()}
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
    getCustomer: (token) => dispatch(act.getCustomer(token)),
    addCustomer: (token,name,identity_number,phone_number,photo) => dispatch(act.addCustomer(token,name,identity_number,phone_number,photo)),
    editCustomer: (token,customerId,name,identity_number,phone_number,photoEdit) => dispatch(act.editCustomer(token,customerId,name,identity_number,phone_number,photoEdit))
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
  ImgModal: {
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
    backgroundColor: '#E7F2F8',
    height: 480,
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