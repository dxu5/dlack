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
    currentChannelId: ui.modal.data,
    currentUsers: getUsers(
      entities.userChannels,
      ui.modal.data,
      entities.users,
      session.currentUserId
    ),
  };
};

const getUsers = (userChannels, currentChannelId, users, currentUserId) => {
  let final = {};
  for (const userChannel in userChannels) {
    if (
      userChannels[userChannel].channel_id === Number(currentChannelId) &&
      userChannels[userChannel].user_id !== Number(currentUserId)
    ) {
      final[userChannels[userChannel].user_id] =
        users[userChannels[userChannel].user_id];
    }
  }
  debugger;
  return final;
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
