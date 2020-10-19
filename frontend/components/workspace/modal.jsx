import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import CreateChannelModalContainer from "./create_channel_modal_container.js";
import CreateDmModalContainer from "./create_dm_modal_container.js";
import DeleteChannelModalContainer from "./delete_channel_modal_container.js";
import UpdateChannelModalContainer from "./update_channel_modal_container.js";
function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case "channel":
      component = <CreateChannelModalContainer />;
      break;
    case "dm":
      component = <CreateDmModalContainer />;
      break;
    case "delete":
      component = <DeleteChannelModalContainer />;
      break;
    case "update":
      component = <UpdateChannelModalContainer />;
      break;
    case "user":
      component = <h1>Edit User</h1>;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
