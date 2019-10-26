import React, {Component} from 'react';
import {
  Container, 
  Content, 
  View, 
  Text, 
  Row,
  Left,
  Right,
  Body,
  Title,
  Header,
  Button, 
  Icon,  
  } 
  from 'native-base';
import { StyleSheet, Image, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import * as act from '../_actions/user'

class Setting extends Component{

  constructor(props){
    super(props);
    this.state ={
        token: null,
        id: null
    }
  }

  async componentDidMount(){
      await this.getToken()
      await this.getId()
      this.showUser()
      console.log(this.props.user, "??????????????????")
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

  showUser = () => {  
    this.props.getUser(id = this.state.id, token = this.state.token)
  }

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    this.props.navigation.navigate('Login')
}

  render(){

    return(
      <Container>
        <Content>
          <View>
           
            <Image style={styles.Img} source={{uri: this.props.user.user.image }}/>
            <Text>{this.props.user.user.email}</Text>
            <Text>{this.props.user.user.username}</Text>
            <View>
            <TouchableOpacity
              onPress={() => this.logout()}
              >
                <Text>Log Out</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch =>  {
  return {
    getUser: (id,token) => dispatch(act.getUser(id,token))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)

const styles = StyleSheet.create({
  Img: {
    borderWidth: 2, 
    borderColor: "black", 
    alignSelf: 'center',
    width: 200, 
    height:200, 
    borderRadius: 100},
})