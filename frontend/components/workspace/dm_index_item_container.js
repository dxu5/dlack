import { connect } from "react-redux";
import DMIndexItem from "./dm_index_item.jsx";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    channel: ownProps.channel,
    channels: state.entities.channels,
  };
};

export default withRouter(connect(mapStateToProps, null)(DMIndexItem));
