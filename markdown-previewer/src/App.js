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
    this.handleChange= this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div>
        <EditorArea
          input={this.state.input}
          onChange={this.handleChange}
          />
        <PreviewArea
          input={this.state.input}/>
      </div>
    );
  }
}
export default App;



const EditorArea = (props) => {
  return (
      <textarea type="textarea"
        onChange={props.onChange}
        value={props.input}
        id="editor">
      </textarea>
  )
}


const PreviewArea = (props) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.input)}}>
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
