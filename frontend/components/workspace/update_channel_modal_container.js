import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";
import UpdateChannelForm from "./update_channel_form.jsx";

const mapStateToProps = ({ errors, entities, session, ui }) => {
  return {
    currentUserId: session.currentUserId,
    totalUsers: Object.values(entities.users),
    errors: errors.session,
    currentChannel: entities.channels[ui.modal.data],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => {
      dispatch(clearErrors());
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateChannelForm);
