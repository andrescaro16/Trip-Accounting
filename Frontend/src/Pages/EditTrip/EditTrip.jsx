import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { DateInput } from '@mantine/dates';
import { useLocation } from 'react-router-dom';
import { getTowns, putTrip, getTrip } from '../../Api/api';
import { Modal } from '../../Components/Modal/Modal';
import '../TripForm/TripForm.css'

function EditTrip() {

	const navigate = useNavigate();
	const location = useLocation();

	const [towns, setTowns] = useState([]);
	const [townOptions, setTownOptions] = useState([]);
	const [isToll, setIsToll] = useState(false);
	const [isExtraCost, setIsExtraCost] = useState(false);
	const [id, setId] = useState(location.pathname.split('/')[2]);
	const [oldTrip, setOldTrip] = useState({});

	const [success, setSuccess] = useState(false);
	const [done, setDone] = useState(false);

	// ----------------------------[Get old trip]----------------------------
	useEffect(() => {
		async function fetchOldTrip() {
			try {
				const response = await getTrip(id);
				setOldTrip(response.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchOldTrip();
	}, []);

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
				date: event.target[0].value,
				departureTime: `${event.target[2].value}:00.000`,
				town: Number(event.target[4].value),
				toll: isToll ? {
					description: event.target[6].value,
					price: Number(event.target[7].value),
				} : null,
				extraCost: isToll && isExtraCost ? {
					description: event.target[9].value,
					price: Number(event.target[10].value),
				} : isExtraCost ? {
					description: event.target[7].value,
					price: Number(event.target[8].value),
				} : null,
				arrivalTime: isToll && isExtraCost ? `${event.target[11].value}:00.000` : isToll || isExtraCost ? `${event.target[9].value}:00.000` : `${event.target[7].value}:00.000`,
			}
		}

		async function updateTrip() {
			try {
			  const response = await putTrip(id, trip);
			  setDone(true);
			  if(response){
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					navigate('/trip-history');
				}, 2500);
			  } else{
				setSuccess(false);
				setTimeout(() => {
					navigate('/trip-history');
				}, 2500);
				throw new Error('Error al actualizar el viaje');
			  }
			} catch (error) {
			  console.log(error);
			}
		}
		updateTrip();
	}

	function addDays(date, days){
		date.setDate(date.getDate() + days);
		return date;
	}


	return (
		<>
			{success && <Modal status='success' />}
			{done && !success && <Modal status='error' />}
			<div className='trip-form-background'>

				<div className='trip-form-container'>

					<h1 className='trip-form-title'>Editar viaje</h1>

					<form className='trip-form' onSubmit={onSubmit}>

						<div className='date-input-field'>
							<label htmlFor='date'>Día de salida</label>
							{oldTrip.attributes ? (
								<DateInput
									name='date'
									valueFormat="YYYY-MM-DD"
									placeholder={`${oldTrip.attributes.date}`}
									className='date-input'
									defaultValue={addDays(new Date(oldTrip.attributes.date), 1)}
									required
								/>
							) : null}
						</div>
						
						<div className='departure-time-input-field'>
							<label htmlFor='departureTime'>Hora de salida</label>
							{oldTrip.attributes ? (
								<input type="time" name='departureTime' defaultValue={(oldTrip.attributes.departureTime).slice(0, 5)} required />
							) : null}
						</div>

						<div className='route-input-field'>
							<label htmlFor='towns'>Ruta</label>
							{oldTrip.attributes ? (
								<Select
									name="towns"
									placeholder="Selecciona una ruta"
									defaultValue={[{
										label: oldTrip.attributes.town.data.attributes.route,
										value: oldTrip.attributes.town.data.id
									}]}
									options={townOptions}
									isDisabled={false}
									isLoading={false}
									isClearable={true}
									isRtl={false}
									isSearchable={true}
									className='route-select'
									required
								/>
							) : null}
						</div>

						<div className='tollCheck-input-field'>
							<div className='check-container'>
								<label htmlFor='isToll'>¿Tuviste algún peaje?</label>
								<input type='checkbox' name='isToll' className='tollCheck-input' value={isToll} onClick={handleIsToll} />
							</div>
							{isToll && oldTrip.attributes ? (
								<div className='toll-input-field'>
									<label htmlFor='toll'>Describe todo el gasto de peajes</label>
									<input type="text" name="toll" defaultValue={oldTrip.attributes.toll?.description} placeholder="Descripción..." />
									<label htmlFor='toll-amount'>Monto TOTAL de los peajes</label>
									<input type='number' name='toll-amount' defaultValue={oldTrip.attributes.toll?.price} placeholder='Precio total...' />
								</div>
							) : null}
						</div>

						<div className='extraCostCheck-input-field'>
							<div className='check-container'>
								<label htmlFor='isExtraCost'>¿Tuviste algún costo extra? (cualquier cosa que sume a los viáticos)</label>
								<input type='checkbox' name='isExtraCost' className='extraCost-input' value={isExtraCost} onClick={handleIsExtraCost} />
							</div>
							{isExtraCost && oldTrip.attributes ? (
								<div className='extraCost-input-field'>
									<label htmlFor='extraCost'>Describe TODO el gasto extra</label>
									<input type="text" name="extraCost" defaultValue={oldTrip.attributes.extraCost?.description} placeholder="Descripción..." />
									<label htmlFor='extraCost-amount'>Monto TOTAL de los costos extras</label>
									<input type='number' name='extraCost-amount' defaultValue={oldTrip.attributes.extraCost?.price} placeholder='Gasto total...' />
								</div>
							) : null}
						</div>

						<div className='arrival-time-input-field'>
							<label htmlFor='arrivalTime'>Hora de llegada</label>
							{oldTrip.attributes ? (
								<input type="time" name='arrivalTime' defaultValue={(oldTrip.attributes.arrivalTime).slice(0, 5)} required />
							) : null}
						</div>

						<button type='submit' className='submit-button-tripForm'>Actualizar</button>
					</form>
				</div>
			</div>
		</>
	)
}

export { EditTrip };