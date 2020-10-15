import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMessage } from "../../../actions/message_actions.js";
import MessageForm from "./message_form.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.entities.channels[ownProps.match.params.channelId],
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createMessage: (message) => dispatch(createMessage(message)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageForm)
);
