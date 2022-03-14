import { useState } from "react";

const useForm = (options) => {
	const [data, setData] = useState(options?.initialValues || {});
	const [errors, setErrors] = useState({});

	const handleInputChange = (event) => {
		event.preventDefault();
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setData({
			...data,
			[name]: value
		});
	};

	const handleSubmit = async (e, onSubmit) => {
		e.preventDefault();
		const validations = options?.validations;
		let valid = true;

		if (validations) {
			const newErrors = {};
			for (const key in validations) {
				const value = data[key];
				const validation = validations[key];
				if (validation?.required?.value && !value) {
					valid = false;
					newErrors[key] = validation?.required?.message;
				}

				const pattern = validation?.pattern;
				if (pattern?.value && !RegExp(pattern.value).test(value)) {
					valid = false;
					newErrors[key] = pattern.message;
				}

				const custom = validation?.custom;
				if (custom?.isValid && !custom.isValid(value)) {
					valid = false;
					newErrors[key] = custom.message;
				}
			}

			if (!valid) {
				setErrors(newErrors);
				return;
			}
		}

		setErrors({});

		if (onSubmit && valid) {
			onSubmit();
		}
	};

	return {
		data,
		setData,
		errors,
		handleInputChange,
		handleSubmit,
	};

};

export default useForm;
