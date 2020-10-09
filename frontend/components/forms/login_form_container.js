import { connect } from "react-redux";
import { login } from "../../actions/session_actions.js";
import LoginForm from './login_form.jsx/index.js'


const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType = "Log In"
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)