import { useState, useCallback } from 'react';

function useModal() {
	const [showLocalModal, updateLocal] = useState(false);

	const handleModal = useCallback((value) => {
		updateLocal(value);
	}, [updateLocal]);

	return {
		handleModal,
		showLocalModal,
	};
}

export default useModal;
