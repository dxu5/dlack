import { connect } from "react-redux";
import { signup } from "../../actions/session_actions.js";
import SignupForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "Sign Up",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
