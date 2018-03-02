import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import t from 'tcomb-form-native';
import Counter from '../component/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法

const Form = t.form.Form;
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

let options = {
	  auto: 'placeholders',
	  // order: ['name', 'surname', 'rememberMe', 'gender', 'age', 'email'],
	  fields: {
		    name: {
		      placeholder: 'Your placeholder here',
		      label: 'name',
		      help: 'Your help message here',
		      error: 'Insert a valid email'
		    }
		  },
	  i18n: {
	    optional: ' (optional)',
	    required: '',
	    add: 'Add',   // add button
	    remove: '✘',  // remove button
	    up: '↑',      // move up button
	    down: '↓'     // move down button
	  }
};
options.fields['password'] = 'password'
let Gender = t.enums({
  M: 'Male',
  F: 'Female'
});
let Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  password:t.String,
  email: t.maybe(t.String),
  age: t.Number,   // a required number
  birthDate: t.Date,            
  rememberMe: t.Boolean,
  gender: Gender,       // a boolean
  position: t.struct({
    latitude: t.Number,
    longitude: t.Number
  })
});
class FormList extends Component {
  constructor(props){
      super(props)
      this.state={
		value: {
			  name: 'Giulio',
			  surname: 'Canti',
			  age: 41,
			  gender: 'M'
      	}
      }     
  }

  static navigationOptions = {
    title: '表单2',
  };
  
  logout() {
    const { loginOut } = this.props;
    loginOut();
    this.props.navigation.dispatch(resetAction)
  }
  Form() {
    const {navigate} = this.props.navigation;
    navigate("Form");
  }
  onChange(value) {
    this.setState({value});
  }
  onPress() {
    let value = this.refs.form.getValue();
    if (value) { 
      console.log(value);
    }
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>

      	<ScrollView style={{flex:1}}>
      	<Form
          ref="form"
          type={Person}
          value={this.state.value}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
       

        <TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>退出登录
            </Text>
          </View>
        </TouchableOpacity> 
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FFFF'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    incrementFn: () => dispatch(counterAction.increment()),
    decrementFn: () => dispatch(counterAction.decrement()),
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(FormList)
