import React, { MouseEventHandler } from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

interface ModalProps {
  primaryLabel: string;
  onPrimaryClick: MouseEventHandler<HTMLElement>;
  secondaryLabel?: string;
  onSecondaryClick?: MouseEventHandler<HTMLElement>;
  secondary?: Boolean;
  children?: React.ReactNode;
}

const Modal = ({
                 primaryLabel,
                 secondaryLabel,
                 onPrimaryClick,
                 onSecondaryClick,
                 secondary = false,
                 children
               }: ModalProps): JSX.Element => {

  return (
    <BootstrapModal show centered>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        {secondary &&
          <Button variant="secondary" onClick={onSecondaryClick}>{secondaryLabel}</Button>
        }
        <Button variant="primary" onClick={onPrimaryClick}>{primaryLabel}</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default Modal;