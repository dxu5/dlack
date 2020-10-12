import { connect } from "react-redux";
import Workspace from "./workspace.jsx";

const mapStateToProps = (state) => {
  return {
    channels: Object.values(state.entities.channels),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
