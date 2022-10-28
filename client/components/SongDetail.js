import React, { Component } from "react";
import query from "../queries/fetchSong";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

export const SongDetail = (props) => {
  const { song, loading } = props.data;
  if (loading) {
    return <h3>Loading..</h3>;
  }
  return (
    <div className="container">
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={props.params.id} />
    </div>
  );
};

export default graphql(query, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
