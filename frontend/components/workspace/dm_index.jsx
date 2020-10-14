import React from "react";
import DMIndexItemContainer from "./dm_index_item_container.js";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import Modal from "./modal.jsx";
class DmIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  dms() {
    return this.props.channels.map((channel) => {
      if (channel.is_dm) {
        return <DMIndexItemContainer channel={channel} key={channel.id} />;
      }
    });
  }

  renderList() {
    if (this.state.open) {
      return <ul>{this.dms()}</ul>;
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
          <div className="caret-container">
            <i
              id="caret"
              className={
                this.state.open ? "fas fa-caret-down" : "fas fa-caret-right"
              }
            ></i>
          </div>

          <h2 onClick={this.handleClick}>Direct Messages</h2>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateModal: () => dispatch(openModal({ type: "dm" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DmIndex);
