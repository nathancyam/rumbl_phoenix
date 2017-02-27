import React, { Component, PropTypes } from "react";
import Player from "./player";
import Annotation from "./annotation";

const propTypes = {
  socket: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired,
};

class Video extends Component {
  constructor(props) {
    super(props);
    const {socket, channel} = this.props;
    socket.connect();
    this.onSocketOkResp = this.onSocketOkResp.bind(this);
    this.onSocketErrResp = this.onSocketErrResp.bind(this);
    this.player = null;
    this.state = {
      channel: socket.channel(channel),
    };
  }

  componentDidMount() {
    const { channel } = this.state;
    channel.join()
      .receive("ok", this.onSocketOkResp)
      .receive("error", this.onSocketErrResp);
    
    channel.on("ping", ({ count }) => console.log("ping", count));
  }

  onSocketOkResp(resp) {
    console.log(`Join Channel: ${this.props.channel}`, resp);
  }

  onSocketErrResp(err) {
    console.error(err);
  }

  setPlayer(player) {
    this.player = player;
  }

  getCurrentTime() {
    return Math.floor(this.player.getCurrentTime() * 1000);
  }

  render() {
    const video = document.getElementById("video");
    const videoId = video.getAttribute("data-player-id");

    return (
      <div className="video-app">
        <div className="col-sm-7">
          <Player
            iframeDomId="example"
            playerId={videoId}
            onSetPlayer={(player) => this.setPlayer(player)}
            onReady={() => console.log("ready")}
          />
        </div>
        <div className="col-sm-5">
          <Annotation
            channel={this.state.channel}
            getCurrentTime={() => this.getCurrentTime()}
          />
        </div>
      </div>
    );
  }
}

Video.propTypes = propTypes;

export default Video;