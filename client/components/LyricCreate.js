import React, { Component } from "react";
import gql from "graphql-tag"
import { graphql } from "react-apollo";



const mutation = gql`
mutation AddLyric($songId: ID, $content: String){
    addLyricToSong(songId: $songId, content: $content){
      id,
      title,
      lyrics{
        id,
        content,
        likes
      }
    }
  }`
class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: " " };
  }

  onSubmit(event){
    event.preventDefault()
    this.props.mutate({
        variables: {
            songId: this.props.songId,
            content:this.state.content
        }
    })
    this.setState({content: ""})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label> Add a Lyric </label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

export default graphql(mutation)(LyricCreate)