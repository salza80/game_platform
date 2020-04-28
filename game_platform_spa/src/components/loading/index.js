import React from 'react';
import { Spinner } from 'react-bootstrap'

export default function Loading() {

	return (
		<div className="text-center mt-5">
			<Spinner animation="border" variant="primary" />
		</div>
	)

}