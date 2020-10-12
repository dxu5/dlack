import React from "react";

class SplashInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="separator">
          <h1>Create a new team dynamic</h1>
          <p>Talk and communicate to team members with purpose</p>
        </div>
        <ul className="splash-list">
          <div className="section-description">
            <i id="splash-icon" className="fas fa-poll"></i>
            <br />
            <div className="icon-header">
              <strong>Increase Team Productivity</strong>
            </div>
            <div>
              Dlack allows your team to effectively communicate in order to
              produce the best results.
            </div>
          </div>
          <div className="section-description">
            <i id="splash-icon" className="far fa-paper-plane"></i>
            <br />
            <div className="icon-header">
              <strong>Work Happens Faster</strong>
            </div>
            <div>
              Our instant and streamlined messaging system allows for faster and
              clearer communication.
            </div>
          </div>
          <div className="section-description">
            <i id="splash-icon" className="far fa-comment-alt"></i>
            <br />
            <div className="icon-header">
              <strong>It's All Happening Inside Channels</strong>
            </div>
            <div>
              Follow along with everything related to individual topics,
              projects or teams in their dedicated channels.
            </div>
          </div>
        </ul>
        <div className="splash-part2">
          <div className="splash-content-2">
            <div className="text-col-2">
              <h1>Bring your team together in channels</h1>
              <p>
                A channel is the place for everything related to a project,
                topic or team. Everyone in a channel sees the same messages and
                stays on the same page, allowing seamless communication.
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
      </div>
    );
  }
}

export default SplashInfo;
