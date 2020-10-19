import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMessage } from "../../../actions/message_actions.js";
import { getChannelInfo } from "../../../actions/channel_actions";
import MessageForm from "./message_form.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.entities.channels[ownProps.match.params.channelId],
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChannelInfo: () =>
      dispatch(getChannelInfo(ownProps.match.params.channelId)),
    createMessage: (message) => dispatch(createMessage(message)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageForm)
);
