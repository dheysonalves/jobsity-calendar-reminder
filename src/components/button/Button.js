import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

export default function Button({ color, text, id, type = 'button', isDisabled, onClick }) {

	const getColor = (() => {
		switch (color) {
			case 'success':
				return 'green-bg';
			case 'alert':
				return 'yellow-bg contrast-color';
			case 'danger':
				return 'red-bg';
			default:
				return '';
		}
	});


	return (
		<button type={type} className={`main-button ${getColor()} mt-16`} disabled={isDisabled} onClick={onClick} id={id} aria-label={id}>{text}</button>
	);
}

Button.propTypes = {
	id: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.string
};
