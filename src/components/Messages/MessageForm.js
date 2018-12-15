import React from "react"
import { Segment, Button, Input } from "semantic-ui-react"
import firebase from "../../firebase"

class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: []
  }

  /* form event */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createMessage = () => {
    const message = {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    }
    return message
  }

  /* firebase event*/
  sendMessage = () => {
    const { messagesRef } = this.props
    const { message, channel, errors } = this.state

    if (message) {
      this.setState({
        loading: true
      })
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            loading: false,
            message: "",
            errors: []
          })
        })
        .catch(err => {
          this.setState({
            loading: false,
            errors: errors.concat(err)
          })
        })
    } else {
      this.setState({
        errors: errors.concat({ message: "Add a message" })
      })
    }
  }

  render() {
    const { errors } = this.state
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={
            errors.some(error => error.includes("message")) ? "error" : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            onClick={this.sendMessage}
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    )
  }
}

export default MessageForm
