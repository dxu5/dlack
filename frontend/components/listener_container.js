import { connect } from "react-redux";
import Listener from "./listener.jsx";
import {
  receiveMessage,
  removeMessage,
  receiveUpdateMessage,
} from "../actions/message_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUserId,
    channelIds: Object.keys(state.entities.channels).map((id) => {
      return Number(id);
    }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  removeMessage: (message) => dispatch(removeMessage(message.id)),
  receiveUpdateMessage: (message) => dispatch(receiveUpdateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
