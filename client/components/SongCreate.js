import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";
import { query } from "../queries/fetchSongs";

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
  }
  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query }],
      })
      .then(() => {
        hashHistory.push("/");
      })
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <div className="container">
        <Link to="/">Back</Link> <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            required
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
