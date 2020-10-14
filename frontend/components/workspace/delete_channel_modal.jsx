import React from "react";

class DeleteChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.destroyChannel(this.props.modal.data).then(() => {
      this.props.closeModal();
      this.props.history.push("/channels/1");
    });
  }

  render() {
    return (
      <div className="channel-form-container">
        <div className="channel-modal-header">
          <h1>Delete Your Channel</h1>
          <br />
          <div onClick={this.props.closeModal} className="close-x">
            &#10005;
          </div>
        </div>
        <p className="create-channel-description">
          Are you sure you want to delete this channel?
          <br />
          <strong>This cannot be undone.</strong>
        </p>
        <br />
        <input
          onClick={this.handleClick}
          className="channel-create"
          type="submit"
          value="Delete"
        />
      </div>
    );
  }
}

export default DeleteChannelModal;
