import React, { Component, PropTypes } from "react";

const propTypes = {
  iframeDomId: PropTypes.string,
  playerId: PropTypes.string,
  onReady: PropTypes.func,
  onSetPlayer: PropTypes.func,
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.onIframeReady = this.onIframeReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.state = {
      player: null,
    };
  }

  componentDidMount() {
    this.init();
  }

  onIframeReady() {
    const { iframeDomId, onReady, playerId } = this.props;
    const options = {
      height: 360,
      width: 420,
      videoId: playerId,
      events: {
        onReady: event => onReady(event),
        onStateChange: event => this.onPlayerStateChange(event),
      }
    };
    const player = new YT.Player(iframeDomId, options);
    this.props.onSetPlayer(player);
    this.setState({ player });
  }

  onPlayerStateChange(event) {}

  init() {
    window.onYouTubeIframeAPIReady = () => {
      this.onIframeReady();
    }
    let youtubeScriptTag = document.createElement("script");
    youtubeScriptTag.src = "//www.youtube.com/iframe_api";
    document.head.appendChild(youtubeScriptTag);
  }

  render() {
    return (
      <div>
        <div id={this.props.iframeDomId}></div>
      </div>
    );
  }
}

Player.propTypes = propTypes;

export default Player;