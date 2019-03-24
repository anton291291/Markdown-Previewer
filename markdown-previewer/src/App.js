import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <EditorArea/>
        <PreviewArea/>
      </div>
    );
  }
}
export default App;



const EditorArea = (props) => {
  return (
      <input type="textarea"
        name=""
        value=""
        id="editor">
      </input>
  )
}


const PreviewArea = (props) => {
  return (
    <div id="preview"/>

  )
}
