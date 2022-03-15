import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

import './Modal.scss';

export default function Modal({ showModal, handleShowModal, children }) {
	return (
		<ReactModal
			isOpen={showModal}
			contentLabel="Form add reminder modal"
			onRequestClose={handleShowModal}
			shouldCloseOnOverlayClick={true}
			appElement={document.getElementById('root')}
			className="modal-container"
			data-testid='modal-container'
		>
			<div className="container-close-btn">
				<MdClose onClick={handleShowModal} color="#EB5757" size={28} className="cursor-pointer" />
			</div>
			{children}
		</ReactModal>
	);
}

Modal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	handleShowModal: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
