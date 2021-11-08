import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify'
import { render } from 'react-dom';


class App extends Component {
  state = { fileUrl: '', file: '', filename: '' }
  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    }
    )
  }

  saveFile = () =>{
    Storage.put(this.state.filename, this.state.file)
    .then(() => {
      console.log('Se guardo bien')
      this.setState({fileUrl: '', file: '', filename: ''})
    })
    .catch(err => {
      console.log("error subiendo archivo",err)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>We now have Auth!</h1>
        </header>
        <input type='file' onChange={this.handleChange}/>
        <img src={this.state.fileUrl}/>
        <button onClick={this.saveFile}> Confirmar</button>
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(App);