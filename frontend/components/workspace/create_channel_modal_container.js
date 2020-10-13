import { connect } from "react-redux";
import React from "react";
import { closeModal } from "../../actions/modal_actions";
import createChannelForm from "./create_channel_form.jsx";

const mapStateToProps = ({ errors, entities }) => {
  return {
    totalUsers: Object.values(entities.users),
    errors: errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createChannelForm);
