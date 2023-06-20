import React from 'react';
import './DeleteConfirmation.css';

import { useStateContext } from '../../Context/useStateContext';


function DeleteConfirmation({item}) {

	const { setDeleteItemModal, setDeleteTrip } = useStateContext();

	function onConfirmation() {
		if(item === "trip"){
			setDeleteTrip(true);
			setDeleteItemModal(false);
		}
	}

	function onCancel() {
		setDeleteItemModal(false);
	}

	return (
		<>
		<div className='delete-confirmation'>
			<h1 className='delete-confirmation-title'>¿Seguro que quieres eliminar este viaje?</h1>
			<div className='delete-confirmation-buttons-container'>
				<button className='delete-confirmation-button' onClick={onConfirmation}>Sí</button>
				<button className='delete-confirmation-button cancel' onClick={onCancel}>Cancelar</button>
			</div>
		</div>
		</>
	)
}

export { DeleteConfirmation };