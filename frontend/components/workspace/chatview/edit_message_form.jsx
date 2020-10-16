import React from "react";

class EditMessageForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.handleClose}>editing</button>;
  }
}

export default EditMessageForm;
