import { useState, useCallback } from 'react';

function useModal() {
	const [showModal, updateShowModal] = useState(false);

	const handleShowModal = useCallback((value) => {
		updateShowModal(value);
	}, [updateShowModal]);

	return {
		handleShowModal,
		showModal,
	};
}

export default useModal;
