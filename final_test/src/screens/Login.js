import React, {Component} from 'react';
import {
  Container, 
  Content, 
  View, 
  Text, 
  Form, 
  Item, 
  Input, 
  Button, 
  Icon,  
  } 
  from 'native-base';
import { StyleSheet, Image, Dimensions} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import config from '../../config-env'
import { TouchableOpacity } from 'react-native-gesture-handler';

  export default class Login extends Component{

    constructor(){
      super();
      this.state = {
        icon: "eye-off",
        pass: true,
        isDisabled: true,
        username: "",
        password: null,
        token: undefined,
        id: ""
        
      }}
      


    userLogin = () => {
      axios({
        method: 'POST',
        url: `${config.API_URL}/login`,
        data: {
          email: this.state.username,
          password: this.state.password
        }
      }).then(res => {

        if (typeof res.data.token !== 'undefined') {
          this.setState({
            token: res.data.token,
            id: res.data.user.id
          })
          AsyncStorage.setItem('token', this.state.token)
          AsyncStorage.setItem('id', JSON.stringify(this.state.id))
          this.props.navigation.navigate('Room')
        } else {
          alert('Login failed!')
        }
      })
    }

       
    changeIcon = () => {
      this.setState(prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off':'eye',
        pass: !prevState.pass
      }))
    }

    userValidation = (username) => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(username) == true && this.state.password != null){
        this.setState({
          username, 
          isDisabled: false,
        })
      } else {
        this.setState({
          username,
          isDisabled: true
      })}
      this.setState({
        username,
        })
      }

    passValidation = (password) => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (password != null && reg.test(this.state.username) == true){
        this.setState({
          password,
          isDisabled: false,
        })
      } else {
        this.setState({
          password,
          isDisabled: true
      })}
      this.setState({
        password
        })
      }


    render(){    
      return(
        <Container  >   
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container} >
            <View style={{alignItems: 'center'}}>
              <Image style={styles.logo} source={require('./nyenyak.png')}/>
            </View>
            <View style={styles.center}>
              <View style={styles.title}>
                <Text style={styles.login}>Welcome Admin</Text> 
              </View>
              
              <View style={styles.form}>
                <Form >
                  <Text style={styles.label}>Username</Text>
                  <Item rounded>
                    <Input 
                    placeholder="" 
                    keyboardType= "email-address" 
                    onChangeText={username =>this.userValidation(username)}
                    />
                  </Item>
                  <Text style={styles.label}>Password</Text>
                  <Item rounded>
                    <Input 
                    secureTextEntry= {this.state.pass} 
                    placeholder="" 
                    onChangeText={password => this.passValidation(password)}
                    />
                    <Icon name={this.state.icon} onPress={()=>this.changeIcon()}/>
                  </Item>
                </Form>
                <Button 
                warning disabled = {this.state.isDisabled} rounded block style={styles.button}
                onPress={() => this.userLogin() }
                >
                  <Text >LOG IN</Text>
                </Button>   
              </View>
            </View>
          </View>
        </Content>
      </Container>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f27980',
  },
  center: {
    backgroundColor: 'white',
    margin: 15,
    paddingVertical: 30,
    borderRadius: 15,
    opacity: 0.75,
  },
  title:{
    alignItems: "center", 
    marginBottom:10, 
    fontFamily: 'Austin-Light',
  },
  logo:{
    width: 200,
    height: 200,
  },
  login: {
    fontSize: 25, 
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    padding: 5,
    fontWeight: 'bold',
    
  },
  button:{
    marginTop: 20,
    marginBottom: 10
  }
})