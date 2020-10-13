import { connect } from "react-redux";
import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";
import createChannelForm from "./create_channel_form.jsx";

const mapStateToProps = ({ errors, entities, session }) => {
  return {
    currentUserId: session.currentUserId,
    totalUsers: Object.values(entities.users),
    errors: errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(clearErrors());
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createChannelForm);
