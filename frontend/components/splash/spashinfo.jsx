import React from "react";

class SplashInfo extends React.Component {
  render() {
    return (
      <div className="splash-part2">
        <div className="splash-content-2">
          <div className="text-col-2">
            <h1>Bring your team together in channels</h1>
            <p>
              A channel is the place for everything related to a project, topic
              or team. Everyone in a channel sees the same messages and stays on
              the same page, allowing seamless communication.
            </p>
          </div>
          <div className="splash-picture-col">
            <video
              id="splash-illustration-test"
              src={window.images.dlackchannel}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashInfo;
