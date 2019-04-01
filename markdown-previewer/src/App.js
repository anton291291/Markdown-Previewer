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


  handleClick(e,el) {
    el= document.getElementById("editor")
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const before = text.substring(0, start)
    const after  = text.substring(end, text.length)
    let newText

    switch (e.target.className) {
      case "fa fa-bold":
      case "fa fa-italic":
      case "fa fa-code":
        newText= buttonStyles[e.target.className]
        el.value = (before + buttonTypes[e.target.className] + newText + buttonTypes[e.target.className] + after)
        el.selectionStart =  start + buttonTypes[e.target.className].length
        el.selectionEnd = el.selectionStart + newText.length
      break;

      case "fa fa-quote-left":
      case "fa fa-list-ol":
      case "fa fa-list":
        newText= buttonStyles[e.target.className];
        el.value = (before + buttonTypes[e.target.className] + newText + after)
        el.selectionStart =  start + buttonTypes[e.target.className].length
        el.selectionEnd = el.selectionStart + newText.length
      break;

      case "fa fa-link":
      case "fa fa-picture-o":
        newText= buttonStyles[e.target.className];
        el.value = (before + buttonTypes[e.target.className] + newText + after)
        el.selectionStart =  start + 1 + buttonTypes[e.target.className].length
        el.selectionEnd = el.selectionStart - 2 + newText.length
      break;
      default:

    }
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
