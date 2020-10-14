import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChatView from "./chat_view.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    channels: ownProps.channels,
  };
};

export default withRouter(connect(mapStateToProps, null)(ChatView));
