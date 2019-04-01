import React, { Component } from 'react';
import './App.scss';
import marked from 'marked';


const buttonTypes = {
  'fa fa-bold': '**',
  'fa fa-italic': '_',
  'fa fa-quote-left': '> ',
  'fa fa-link': '[Link]',
  'fa fa-picture-o': '![Alt Text]',
  'fa fa-list-ol': '1. ',
  'fa fa-list': '- ',
  'fa fa-code': '`'
};
const buttonStyles = {
  'fa fa-bold': 'Strong Text',
  'fa fa-italic': 'Emphasized Text',
  'fa fa-quote-left': 'Block Quote',
  'fa fa-link': '(http://)',
  'fa fa-picture-o': '(http://)',
  'fa fa-list-ol': 'List Item',
  'fa fa-list': 'List Item',
  'fa fa-code': 'Inline Code'
};


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
<<<<<<< HEAD
          input={this.state.input}
        />
=======
          value={this.state.input}/>
>>>>>>> test-2
      </div>
    );
  }
}
export default App;


const ToolBar = (props) => {
  return (
    <div className="toolbar">
      <div className="spacer" />
      <i title="Bold" onClick={props.onClick} className="fa fa-bold"/>
      <i title="Italic" onClick={props.onClick} className="fa fa-italic"/>
      <div className="spacer" />
      <i title="Block Quote" onClick={props.onClick} className="fa fa-quote-left"/>
      <i title="Link" onClick={props.onClick} className="fa fa-link"/>
      <i title="Inline Code" onClick={props.onClick} className="fa fa-code"/>
      <i title="Image" onClick={props.onClick} className="fa fa-picture-o"/>
      <div className="spacer" />
      <i title="Bulleted List" onClick={props.onClick} className="fa fa-list"/>
      <i title="Numbered List" onClick={props.onClick} className="fa fa-list-ol"/>
    </div>
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
