import React from 'react'
import ReactDOM from 'react-dom'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: true
    }
  }

  render() {
    return(
      <div>
        {!this.state.isAuthenticated && <Login />}
        {this.state.isAuthenticated && <ChatRoom />}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))