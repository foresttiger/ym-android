import React,{ Component } from 'react';
import {
	Image
} from 'react-native'
import Lightbox from 'react-native-lightbox';


export default class LightboxView extends Component{
	constructor(props){
      super(props)
      this.state = {
        title:props.data,
        source:props.data
      }
  	}
	render(ReactElement, DOMElement, callback){
		 return (
		      <Lightbox navigator={this.props.navigator}>
		        <Image
		          style={{ height: 300 }}
		          source={{ uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg' }}
		        />
		      </Lightbox>
		    );
	}
}