// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";
import { Socket } from "phoenix";
import React from "react";
import ReactDOM from "react-dom";
import Video from "./components/video";

const socket = new Socket("/socket", {
  params: { token: window.userToken },
  logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data)}
})

let video = document.getElementById("video")
if (video) {
  // Player.init(video.id, video.getAttribute("data-player-id"), () => {
  //   console.log("Player ready");
  // })

  const videoId = video.getAttribute("data-id");

  ReactDOM.render(
    <Video socket={socket} channel={`videos:${videoId}`} />,
    document.querySelector("#video-app-mount")
  );
}

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"