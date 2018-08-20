import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Favicon from 'react-favicon';
import 'bootstrap/dist/css/bootstrap.min.css'
import './main_styles.css'

class App extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<React.Fragment>
				 <Favicon url="./pic/pokemon1.ico" />
				<Header/>
				<Main/>
				<Footer/>
			</React.Fragment>
		)
	}
}

ReactDom.render(<App/>, document.getElementById('app'));