import React, { Component } from 'react';
import './App.scss';
import marked from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
  tables: true,
});
const myMarked = new marked.Renderer();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultText
    }
    this.textArea= React.createRef();
    this.handleChange= this.handleChange.bind(this)
    this.handleClick= this.handleClick.bind(this)
  }


handleClick(el, newText) {
  el= document.getElementById("editor")
  newText= "B"
  var start = el.selectionStart
  var end = el.selectionEnd
  var text = el.value
  var before = text.substring(0, start)
  var after  = text.substring(end, text.length)
  el.value = (before + "**" + newText + "**" + after)
  el.selectionStart =  start + 2;
  el.selectionEnd = start + 2 + newText.length;
  el.focus()

}

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div>
        <ToolBar
          onClick={this.handleClick}
         />
        <EditorArea
          ref={this.textArea}
          value={this.state.input}
          onChange={this.handleChange}
        />
        <PreviewArea
          value={this.state.input}/>

      </div>
    );
  }
}
export default App;


const ToolBar = (props) => {
  return (
    <React.Fragment>
    <button
      type="button"
      name="button"
      onClick={props.onClick}
      >
     </button>
    </React.Fragment>
  )
}



const EditorArea = (props) => {
  return (
      <textarea type="textarea"
        ref={props.ref}
        onChange={props.onChange}
        value={props.value}
        id="editor">
      </textarea>
  )
}


const PreviewArea = (props) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.value)}}>
    </div>
  )
}



const defaultText =
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

| foo | bar |
| --- | --- |
| baz | bim |

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`
