import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";


const ModalWindow = (props) => {
    const {
        header,
        message,
        visibility,
    } = props;

    const isVisible = visibility ? "exampleModal" : "exampleModalInvisible";

    return (
        <div
            className="modal fade"
            id={isVisible}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{header}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export class RegistrationModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
            header,
            message,
            toggle,
            modal,
        } = this.props;

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{header}</ModalHeader>
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow;
