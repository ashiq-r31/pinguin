import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

class ChatRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      current: 1,
      text: '',
      messages: [
        { user_id: 1, name: 'Ash', text: `yeah thought about that` },
        { user_id: 1, name: 'Ash', text: `but I'd rather just go to the store` },
        { user_id: 2, name: 'Keya', text: `yooo Wu Wei Din tho.` },
        { user_id: 1, name: 'Ash', text: `let's go get it this weekend` },
        { user_id: 2, name: 'Keya', text: `pork chops and fried rice..mmm` },
        { user_id: 1, name: 'Ash', text: `need to save money tho. shieeeet` },
        { user_id: 2, name: 'Keya', text: `payday this friday for me, suckx for u` },
      ]
    }
  }

  displayMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <div key={index} className={message.user_id === this.state.current
          ? 'message current'
          : 'message'}>
          <div className='message-wrapper'>
            <div>
              <img src={`https://robohash.org/${message.name}`} className='thumb' />
            </div>
            <div className='block'>
              <p className='username'>{message.user_id === this.state.current
                ? 'You'
                : message.name}</p>
              <div className='text'>{message.text}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  handleChange({ target: { value } }) {
    this.setState({ text: value })
  }

  handleKeyPress(e) {
    if (e.charCode === 13 && this.state.text.length > 0) {
      e.preventDefault()
      const messages = [
        ...this.state.messages,
        {
          user_id: this.state.current,
          name: 'Ash',
          text: this.state.text
        }
      ]
      this.setState({ text: '', messages })
    }
  }

  render() {
    return (
      <div>
        <div className='chat'>
          <div className='chat-wrapper'>
            {this.displayMessages()}
          </div>
        </div>
        <div className='textbox'>
          <textarea
            value={this.state.text}
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            placeholder={`Write a message and press Enter to Send`} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ChatRoom />, document.getElementById('app'))