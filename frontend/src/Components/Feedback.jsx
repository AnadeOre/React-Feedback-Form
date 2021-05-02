import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {
	const [info, setInfo] = useState({
		name: '',
		email: '',
		message: '',
		phone: '',
		uploadedFiles: [],
		buttonText: 'Submit',
		uploadPhotosButtonText: 'Upload files',
	});
	const { name, email, message, phone, uploadedFiles, buttonText, uploadPhotosButtonText } = info;
	const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_SECRET } = process.env;

	const handleSubmit = e => {
		e.preventDefault();

		setInfo({ ...info, buttonText: '...sending' });

		axios({
			method: 'POST',
			url: 'http://localhost:8080/api/feedback',
			data: { name, email, message, phone },
		})
			.then(res => {
				if (res.data.success)
					toast('🦄 Thanks for your feedback!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				setInfo({
					...info,
					name: '',
					phone: '',
					email: '',
					message: '',
					buttonText: 'Submited',
					uploadPhotosButtonText: 'Uploaded',
				});
			})
			.catch(err => {
				if (err.response.data.error) toast.error('Failed, try again!');
			});
	};

	const handleChange = name => e => {
		setInfo({ ...info, [name]: e.target.value });
	};

	const uploadWidget = () => {
		window.cloudinary.openUploadWidget(
			{
				cloud_name: REACT_APP_CLOUD_NAME,
				upload_preset: REACT_APP_UPLOAD_SECRET,
				tags: ['images'],
			},
			function (error, result) {
				if (error) console.log(error);
				setInfo({ ...info, uploadPhotosButtonText: 'Uploaded' });
			}
		);
	};

	return (
		<div className='form'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
			/>
			<ToastContainer />
			{/* upload files */}
			<Button onClick={uploadWidget} className='button'>
				{uploadPhotosButtonText}
			</Button>
			<Form onSubmit={handleSubmit}>
				{/* Name */}
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						value={name}
						onChange={handleChange('name')}
						type='name'
						placeholder='Enter your name'
						required
					/>
				</Form.Group>
				{/* Phone */}
				<Form.Group>
					<Form.Label>Phone</Form.Label>
					<Form.Control
						value={phone}
						onChange={handleChange('phone')}
						type='phone'
						placeholder='Enter your phone number'
						required
					/>
				</Form.Group>
				{/* email */}
				<Form.Group>
					<Form.Label>Email Adress</Form.Label>
					<Form.Control
						value={email}
						onChange={handleChange('email')}
						type='email'
						placeholder='Enter email'
						required
					/>
				</Form.Group>
				{/* text area */}
				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control
						onChange={handleChange('message')}
						as='textarea'
						value={message}
						rows={3}
						required
					/>
				</Form.Group>

				<Button type='submit'>{buttonText}</Button>
			</Form>
		</div>
	);
}

export default Feedback;
