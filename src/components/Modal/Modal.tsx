import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";


class Modal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showModal: true,
    }
  }

  handleClose = () => this.setState({...this.state, showModal: false});
  handleShow = () => this.setState({...this.state, showModal: true});

  render() {

    const { showModal } = this.state;
    return (
      <BootstrapModal show={showModal} onHide={this.handleClose} centered>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Modal heading</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>Woohoo, you're reading this text in a modal!</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
}

export default Modal;