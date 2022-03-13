import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';


export default function Button({ color, text, type = 'button', isDisabled, onClick }) {

	const getColor = (() => {
		switch (color) {
			case 'success':
				return 'bg-success';
			case 'alert':
				return 'bg-alert contrast-color';
			case 'danger':
				return 'bg-danger';
			default:
				return '';
		}
	});


	return (
		<button type={type} className={`main-button ${getColor()}`} disabled={isDisabled} onClick={onClick}>{text}</button>
	);
}

Button.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.string
};
