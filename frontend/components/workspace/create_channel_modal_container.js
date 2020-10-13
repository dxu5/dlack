import { connect } from "react-redux";
import React from "react";
import { closeModal } from "../../actions/modal_actions";
import createChannelForm from "./create_channel_form.jsx";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "login",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createChannelForm);
