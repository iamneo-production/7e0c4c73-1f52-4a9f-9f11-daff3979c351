import React from 'react'
import { Modal, Button } from 'react-bootstrap';



export const Modals = (props) => {
    return (
        <Modal size='sm' show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.noSaveChange ? (null) : (
                    <Button variant="primary" {...props} className='btn-sm' onClick={props.handleSubmit}>
                        Save
                    </Button>
                )}

            </Modal.Footer>
        </Modal>
    )

}