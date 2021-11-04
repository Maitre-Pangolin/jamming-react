import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
      playlistName: "New Playlist",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlist.some((e) => e.id === track.id)) return;
    this.setState({ playlist: this.state.playlist.concat([track]) });
  }

  removeTrack(track) {
    this.setState({
      playlist: this.state.playlist.filter(({ id }) => id !== track.id),
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlist.map((e) => e.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
      (response) => {
        this.setState({
          playlist: [],
          playlistName: "New Playlist",
        });
      }
    );
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({
        searchResults,
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>
            Ja<span className='highlight'>mmm</span>ing
          </h1>
          <div className='App'>
            <SearchBar onSearch={this.search} />
            <div className='App-playlist'>
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
              <Playlist
                playlistTrack={this.state.playlist}
                playlistName={this.state.playlistName}
                updatePlaylistName={this.updatePlaylistName}
                onRemove={this.removeTrack}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
