import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        Header
        <div>{ this.props.children }</div>
        Footer
      </div>
    );
  }
}

export default App;

