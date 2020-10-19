import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions.js";
import { logout } from "../../actions/session_actions.js";
import Sidenav from "./sidenav.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    channels: ownProps.channels,
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    openEditUserModal: () => dispatch(openModal({ type: "user" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
