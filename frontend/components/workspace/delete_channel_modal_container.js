import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";
import DeleteChannelModal from "./delete_channel_modal.jsx";
import { withRouter } from "react-router-dom";
import { destroyChannel } from "../../actions/channel_actions";

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    destroyChannel: (channelId) => dispatch(destroyChannel(channelId)),
    closeModal: () => {
      dispatch(clearErrors());
      dispatch(closeModal());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeleteChannelModal)
);
