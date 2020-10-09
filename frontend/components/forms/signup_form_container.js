import { connect } from "react-redux";
import { signup, clearErrors } from "../../actions/session_actions.js";
import SignupForm from "./signup_form.jsx";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "Sign Up",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
