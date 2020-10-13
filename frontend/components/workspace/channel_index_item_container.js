import { connect } from "react-redux";
import ChannelIndexItem from "./channel_index_item.jsx";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    channels: state.entities.channels,
  };
};

export default withRouter(connect(mapStateToProps, null)(ChannelIndexItem));
