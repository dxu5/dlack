import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";
import createDmForm from "./create_dm_form.jsx";

const mapStateToProps = ({ errors, entities, session }) => {
  return {
    currentUserId: session.currentUserId,
    totalUsers: Object.values(entities.users),
    errors: errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(clearErrors());
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createDmForm);
