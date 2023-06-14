import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { DateInput } from '@mantine/dates';
import { getTowns, postTrip } from '../../Api/api';
import { Modal } from '../../Components/Modal/Modal';
import './TripForm.css';


function TripForm() {

	const navigate = useNavigate();

	const [towns, setTowns] = useState([]);
	const [townOptions, setTownOptions] = useState([]);
	const [isToll, setIsToll] = useState(false);
	const [isExtraCost, setIsExtraCost] = useState(false);

	const [success, setSuccess] = useState(false);
	const [done, setDone] = useState(false);

	// ----------------------------[Get towns]----------------------------
	useEffect(() => {
		async function fetchTowns() {
		  try {
			const response = await getTowns();
			setTowns(response.data);
		  } catch (error) {
			console.log(error);
		  }
		}

		fetchTowns();
	}, []);

	useEffect(() => {
		const options = towns.map((town) => ({
			value: town.id,
			label: town.attributes.route,
		}));
		setTownOptions(options);
	}, [towns]);

	// ----------------[Handles Toll and Extra Cost inputs]----------------
	const handleIsToll = () => {
		setIsToll(state => !state);
	}

	const handleIsExtraCost = () => {
		setIsExtraCost(state => !state);
	}

	// ----------------------------[Submit form]----------------------------
	const onSubmit = (event) => {
		event.preventDefault();
		const trip = {
			data: {
				date: event.target[0].value, // Fecha
				departureTime: `${event.target[2].value}:00.000`, // Hora de salida
				town: Number(event.target[4].value), // Id de la ruta
				toll: isToll ? {
					description: event.target[6].value, // Descripción de los peajes
					price: Number(event.target[7].value), // Monto total de los peajes
				} : null,
				extraCost: isToll && isExtraCost ? {
					description: event.target[9].value, // Descripción de los costos extras
					price: Number(event.target[10].value), // Monto total de los costos extras
				} : isExtraCost ? {
					description: event.target[7].value,	// Descripción de los costos extras
					price: Number(event.target[8].value), // Monto total de los costos extras
				} : null,
				arrivalTime: isToll && isExtraCost ? `${event.target[11].value}:00.000` : isToll || isExtraCost ? `${event.target[9].value}:00.000` : `${event.target[7].value}:00.000`, // Hora de llegada
			}
		}

		async function addTrip() {
			try {
			  const response = await postTrip(trip);
			  setDone(true);
			  if(response){
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					navigate('/homepage');
				}, 2500);
			  } else{
				setSuccess(false);
				setTimeout(() => {
					navigate('/homepage');
				}, 2500);
				throw new Error('Error al añadir el viaje');
			  }
			} catch (error) {
			  console.log(error);
			}
		}
		addTrip();
	}

	return (
		<>
			{success && <Modal status='success' />}
			{done && !success && <Modal status='error' />}
			<div className='trip-form-background'>

				<div className='trip-form-container'>

					<h1 className='trip-form-title'>Añadir viaje</h1>

					<form className='trip-form' onSubmit={onSubmit}>

						<div className='date-input-field'>
							<label htmlFor='date'>Día de salida</label>
							<DateInput
								name='date'
								valueFormat="YYYY-MM-DD"
								placeholder="Date input"
								className='date-input'
								required
							/>
						</div>
						
						<div className='departure-time-input-field'>
							<label htmlFor='departureTime'>Hora de salida</label>
							<input type="time" name='departureTime' required />
						</div>

						<div className='route-input-field'>
							<label htmlFor='towns'>Ruta</label>
							<Select
								name="towns"
								placeholder="Selecciona una ruta"
								options={townOptions}
								isDisabled={false}
								isLoading={false}
								isClearable={true}
								isRtl={false}
								isSearchable={true}
								className='route-select'
							/>
						</div>

						<div className='tollCheck-input-field'>
							<div className='check-container'>
								<label htmlFor='isToll'>¿Tuviste algún peaje?</label>
								<input type='checkbox' name='isToll' className='tollCheck-input' value={isToll} onClick={handleIsToll} />
							</div>
							{isToll && (
								<div className='toll-input-field'>
									<label htmlFor='toll'>Describe todo el gasto de peajes</label>
									<input type="text" name="toll" placeholder="Descripción..." />
									<label htmlFor='toll-amount'>Monto TOTAL de los peajes</label>
									<input type='number' name='toll-amount' placeholder='Precio total...' />
								</div>
							)}
						</div>

						<div className='extraCostCheck-input-field'>
							<div className='check-container'>
								<label htmlFor='isExtraCost'>¿Tuviste algún costo extra? (cualquier cosa que sume a los viáticos)</label>
								<input type='checkbox' name='isExtraCost' className='extraCost-input' value={isExtraCost} onClick={handleIsExtraCost} />
							</div>
							{isExtraCost && (
								<div className='extraCost-input-field'>
									<label htmlFor='extraCost'>Describe TODO el gasto extra</label>
									<input type="text" name="extraCost" placeholder="Descripción..." />
									<label htmlFor='extraCost-amount'>Monto TOTAL de los costos extras</label>
									<input type='number' name='extraCost-amount' placeholder='Gasto total...' />
								</div>
							)}
						</div>

						<div className='arrival-time-input-field'>
							<label htmlFor='arrivalTime'>Hora de llegada</label>
							<input type="time" name='arrivalTime' required />
						</div>

						<button type='submit' className='submit-button-tripForm'>Agregar</button>
					</form>
				</div>
			</div>
		</>
	)
}

export { TripForm };