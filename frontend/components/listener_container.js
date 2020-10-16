import { connect } from "react-redux";
import Listener from "./listener";
import { receiveMessage } from "../actions/message_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    channelIds: Object.keys(state.entities.channels).map((id) => {
      return Number(id);
    }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  receiveMessage: (message) => dispatch(receiveMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
