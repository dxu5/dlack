import React from "react";
import ChannelIndexItemContainer from "./channel_index_item_container.js";
import { openModal } from "../../actions/modal_actions.js";
import { connect } from "react-redux";
import Modal from "./modal.jsx";
class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  channels() {
    let notifications = this.createNotifications();
    return this.props.channels.map((channel, idx) => {
      if (!channel.is_dm) {
        return (
          <ChannelIndexItemContainer
            numNotifications={notifications[idx]}
            channel={channel}
            key={channel.id}
          />
        );
      }
    });
  }

  createNotifications() {
    let totalNotifications = [];
    for (let i = 0; i < this.props.channels.length; i++) {
      let count = 0;
      for (const notificationId in this.props.notifications) {
        let notification = this.props.notifications[notificationId];
        if (
          notification.channel_id === this.props.channels[i].id &&
          notification.read === false
        ) {
          count += 1;
        }
      }
      totalNotifications.push(count);
    }
    return totalNotifications;
  }

  renderList() {
    if (this.state.open) {
      return <ul>{this.channels()}</ul>;
    } else {
      <ul></ul>;
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  handleModal() {
    this.props.openCreateModal();
  }

  render() {
    return (
      <div className="channel-index">
        <div className="channels-header">
          <div onClick={this.handleClick} className="caret-container">
            <i
              style={{ cursor: "pointer" }}
              id="caret"
              className={
                this.state.open ? "fas fa-caret-down" : "fas fa-caret-right"
              }
            ></i>
          </div>

          <h2 onClick={this.handleClick}>Channels</h2>
          <div className="create-channel" onClick={this.handleModal}>
            +
          </div>
        </div>
        <Modal />
        <div className="channels-ul">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    notifications: state.entities.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateModal: () => dispatch(openModal({ type: "channel" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex);
