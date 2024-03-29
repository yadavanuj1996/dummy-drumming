import React, { Component } from 'react';
import { render } from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './style.scss';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { beatId: "" };
    this.playMusic = this.playMusic.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    switch (event.keyCode) {
      case 81:
        this.playMusicWith("Q");
        break;
      case 87:
        this.playMusicWith("W");
        break;
      case 69:
        this.playMusicWith("E");
        break;
      case 65:
        this.playMusicWith("A");
        break;
      case 83:
        this.playMusicWith("S");
        break;
      case 68:
        this.playMusicWith("D");
        break;
      case 90:
        this.playMusicWith("Z");
        break;
      case 88:
        this.playMusicWith("X");
        break;
      case 67:
        this.playMusicWith("C");
        break;
    }
  }
  updateBeatId(beatId) {
    this.setState({ beatId: beatId });
  }
  playMusic(event) {
    let eventSourceId = event.target.getAttribute("id");
    let audioId = eventSourceId.charAt(eventSourceId.length - 1).toUpperCase(); // last character of id is given to audio's id
    this.playMusicWith(audioId);
  }
  playMusicWith(audioId) {
    this.state.beatId = audioId;
    this.updateBeatId(audioId);
    document.getElementById(audioId).play();
  }
  render() {
    const DRUM_PAD_CHARS = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
    let drumPads = DRUM_PAD_CHARS.map((element, i) => {
      return (
          <div
            id={`drum-pad-${element}`}
            onClick={this.playMusic}
            class="drum-pad row justify-content-center align-items-center"
          >
            {element.toUpperCase()}
            <audio
              className="clip"
              id={`${element.toUpperCase()}`}
              src={`${bankOne[i].url}`}
            />
          </div>
      );
    });

    return (
      <div id="display" class="row h-100 w-100 justify-content-center align-items-center">
       
        <BeatDetail beatId={this.state.beatId} />
        <div class="w-100"/>
        {drumPads}
      </div>
    );
  }
}

class BeatDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let beatName = bankOne.filter(
      element => element.keyTrigger === this.props.beatId
    );
    let result = "<-- Press the keys -->";
    if (beatName[0] !== undefined) result = beatName[0]["id"];

    return <div id="beat-type" class="row justify-content-center align-items-center">{`${result}`}</div>;
  }
}

render(<Drum />, document.getElementById("drum-machine"));
