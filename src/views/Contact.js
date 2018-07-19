import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';

class Contact extends Component {
	render() {
		return (
			<div>
				<div className="contact-form-wrapper">
					<h2>Got Questions?</h2>
					<h3>Please enter your email address below and a confirmation email will be sent to you.</h3>
					<div className="contact-form">
						<ContactForm />
					</div>
				</div>
			</div>
		);
	}
}

export default Contact;
