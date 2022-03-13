import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from "prop-types";

import './Modal.scss';

export default function Modal({ showModal, handleShowModal, children }) {
	return (
		<ReactModal
			isOpen={showModal}
			contentLabel="Minimal Modal Example"
			onRequestClose={handleShowModal}
			shouldCloseOnOverlayClick={true}
			appElement={document.getElementById('root')}
			className="Modal"
		>
			{children}
			<button onClick={handleShowModal}>Close Modal</button>
		</ReactModal>
	);
}

Modal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	handleShowModal: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
