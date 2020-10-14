import { connect } from "react-redux";
import Workspace from "./workspace.jsx";
import { getChannelInfo } from "../../actions/channel_actions.js";

const mapStateToProps = (state) => {
  return {
    channels: Object.values(state.entities.channels),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChannelInfo: (channelId) => dispatch(getChannelInfo(channelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
