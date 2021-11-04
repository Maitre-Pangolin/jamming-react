import React, { Component } from "react";
import "./Track.css";

export class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    const isRemoval = this.props.isRemoval;
    return (
      <button
        className='Track-action'
        onClick={isRemoval ? this.removeTrack : this.addTrack}>
        {isRemoval ? "-" : "+"}
      </button>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    const track = this.props.track;
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{track.name}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
