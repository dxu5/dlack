import { connect } from "react-redux";
import ChannelIndexItem from "./channel_index_item.jsx";
import { destroyChannel } from "../../actions/channel_actions.js";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    channels: state.entities.channels,
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    destroyChannel: () => dispatch(destroyChannel(ownProps.channel.id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelIndexItem)
);
