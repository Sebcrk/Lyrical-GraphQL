import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import { query } from "../queries/fetchSongs"
import gql from "graphql-tag";
import "../style/style.css"


const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export const SongList = (props) => {
  // console.log(props);
  const onSongDelete = (id) => {
    props
      .mutate({
        variables: { id },
      }).then(() => props.data.refetch())
      .catch((error) => console.error(error));
  }

  const renderSongs = () => {
    return props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i onClick={() => onSongDelete(id)} className="material-icons right">
            delete
          </i>
        </li>
      );
    });
  }

    return (
      <div>
        <ul className="collection">
          {props.data.loading && <p>Loading...</p>}
          {!props.data.loading && renderSongs()}
        </ul>
        <Link className="btn-floating btn-large red right" to="/songs/new">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  
}

export default graphql(mutation)(graphql(query)(SongList));
