import { connect } from "react-redux";
import ChannelListener from "./channel_listener.jsx";
import {
  receiveCreatedChannel,
  deleteChannel,
  receiveChannelInfo,
} from "../actions/channel_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  receiveChannelInfo: (payload) => dispatch(receiveChannelInfo(payload)),
  deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
  receiveChannel: (channel) => dispatch(receiveCreatedChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListener);
