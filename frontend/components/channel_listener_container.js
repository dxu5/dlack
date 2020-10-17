import { connect } from "react-redux";
import ChannelListener from "./channel_listener.jsx";
import { receiveCreatedChannel } from "../actions/channel_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  receiveChannel: (channel) => dispatch(receiveCreatedChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListener);
