import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions.js";
import LoginForm from "./login_form.jsx";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "Log In",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
