import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import { getTrips, deleteTrip as deleteTripApi } from '../../Api/api';
import { LoadingHistory } from '../../Components/LoadingHistory/LoadingHistory';
import { Modal } from '../../Components/Modal/Modal';
import truck from '../../Assets/Animations/truckDriving.json';
import { FiEdit } from 'react-icons/fi';
import './TripHistory.css';

import { useStateContext } from '../../Context/useStateContext';


function TripHistory() {

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [trips, setTrips] = useState([]);
	const [tripsByMonth, setTripsByMonth] = useState([]);
	const [orderedTrips, setOrderedTrips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [idToDelete, setIdToDelete] = useState(null);

	const { deleteItemModal, deleteTrip, setDeleteItemModal, setDeleteTrip } = useStateContext();


	// ----------------------------[Get trips]----------------------------
	useEffect(() => {
		async function fetchTrips() {
			try {
				setLoading(true);
				const response = await getTrips();
				const dots = await dotsInPrices(response.data);
				setTrips(dots);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchTrips();
	}, []);

	// -------------------------------[On change event]--------------------------------------
	function onChangeSelectedDate(e) {
		const date = addDays(new Date(e), 1);
		setSelectedDate(date);
	}

	// --------------------------[Get trips of selected month]-------------------------------
	useEffect(() => {
		const tripsOfSelectedMonth = trips.filter((trip) => {
			const tripDate = addDays(new Date(trip.attributes.date), 1);
			const tripMonth = tripDate.getMonth();
			const tripYear = tripDate.getFullYear();
			const selectedMonth = selectedDate.getMonth();
			const selectedYear = selectedDate.getFullYear();
			return tripMonth === selectedMonth && tripYear === selectedYear;
		});
		setTripsByMonth(tripsOfSelectedMonth);
	}, [ trips, selectedDate ]);

	useEffect(() => {
		setOrderedTrips(tripsByMonth.sort((a, b) => {
			return new Date(b.attributes.date) - new Date(a.attributes.date);
		}));
	}, [tripsByMonth])

	useEffect(() => {
		console.log(orderedTrips);
	}, [orderedTrips]);

	function addDays(date, days){
		date.setDate(date.getDate() + days);
		return date;
	}

	function dotsInPrices(data) {
		const trips = data?.map((trip) => {
			const viatic = trip.attributes.town.data.attributes.viatic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const salary = trip.attributes.town.data.attributes.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const toll = trip.attributes.toll?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const extraCost = trip.attributes.extraCost?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			return {
				...trip,
				attributes: {
					...trip.attributes,
					town: {
						data: {
							...trip.attributes.town.data,
							attributes: {
								...trip.attributes.town.data.attributes,
								viatic,
								salary,
							}
						}
					},
					...(toll
						? {
							toll: {
							  ...trip.attributes.toll,
							  price: toll
							}
						  }
						: {}),
					...(extraCost
						? {
							extraCost: {
								...trip.attributes.extraCost,
								price: extraCost,
							}
						}
						: {}),
				},
			};
		});
		return trips;
	}


	// ----------------------------[Delete item]----------------------------
	function onDeleteItem (id) {
		setDeleteItemModal(true);
		setIdToDelete(id);
	}

	useEffect(() => {
		if (deleteTrip) {
			const newTrips = trips.filter((trip) => trip.id !== idToDelete);
			async function deleteFetch() {
				try {
					const response = await deleteTripApi(idToDelete);
					console.log("response",response);
				} catch (error) {
					console.log(error);
				}
			}
			deleteFetch();
			setTrips(newTrips);
			setDeleteTrip(false);
		}
	}, [ deleteTrip ]);


	return (
		<>
		{deleteItemModal && <Modal status='deleteConfirmationTrip'/>}
		<div className='trip-history-container'>
			<div className='trip-history-header-container'>

					<Player autoplay loop speed={0.7} src={truck} className='truck-trip-history' />

				<h1 className='trip-history-title'>Historial de viajes<br/> <span>Mr. Tatan</span></h1>
			</div>
			
			<MonthPickerInput
				placeholder="Mes"
				icon={<FaRegCalendarAlt />}
				description="Selecciona el mes del que deseas ver los viajes"
				radius="md"
				className='month-picker-input'
				value={selectedDate}
				onChange={onChangeSelectedDate}
			/>

			{loading ? (
				<>
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
					<LoadingHistory />
				</>
			) : (
				<Accordion variant="separated" >
					{orderedTrips[0] ? (orderedTrips.map((trip) => (
						<Accordion.Item value={`${trip.id}`} key={`${trip.id}`} className='accordion-item'>
							<Accordion.Control>
								<div className='control'>
									<span className='route'>{trip.attributes.town.data.attributes.route}</span>
									<div className='right-container'>
										<Link to={`/edit-trip/${trip.id}`} className='edit'><FiEdit color='#111'/></Link>
									</div>
								</div>
							</Accordion.Control>
							<Accordion.Panel>
								<div className='panel'>
									<div className='panel-left'>
										<div className='panel-left-container'>
											<span className='panel-title'>Fecha <span className='date-format'>(yyyy-mm-dd)</span></span> <br />
											<span className='panel-left-value'>{trip.attributes.date}</span>
										</div>
										<div className='panel-left-container'>
											<span className='panel-title'>Hora de salida</span> <br />
											<span className='panel-left-value'>{(trip.attributes.departureTime).slice(0, -7)}</span>
										</div>
										<div className='panel-left-container'>
											<span className='panel-title'>Hora de llegada</span> <br />
											<span className='panel-left-value'>{(trip.attributes.arrivalTime).slice(0, -7)}</span>
										</div>
									</div>
									<div className='panel-right'>
										<div className='panel-right-container'>
											<span className='panel-title'>¿Peajes?</span> <br />
											<span className='panel-right-value'>{trip.attributes.toll ? `${trip.attributes.toll.description}` : 'No'}</span>
										</div>
										{trip.attributes.toll && (
											<div className='panel-right-container'>
												<span className='panel-title'>Costo de peajes</span> <br />
												<span className='panel-right-value'>{trip.attributes.toll.price}</span>
											</div>
										)}
										<div className='panel-right-container'>
											<span className='panel-title'>¿Costo extra?</span> <br />
											<span className='panel-right-value'>{trip.attributes.extraCost ? `${trip.attributes.extraCost.description}` : 'No'}</span>
										</div>
										{trip.attributes.extraCost && (
											<div className='panel-right-container'>
												<span className='panel-title'>Total de costo extra</span> <br />
												<span className='panel-right-value'>{trip.attributes.extraCost?.price}</span>
											</div>
										)}
									</div>
								</div>
								<div className='panel-bottom'>
									<div className='panel-bottom-container'>
										<span className='panel-title'>Viáticos</span> <br />
										<span className='panel-bottom-value'>{trip.attributes.town.data.attributes.viatic}</span>
									</div>
									<div className='panel-bottom-container'>
										<span className='panel-title'>Salario</span> <br />
										<span className='panel-bottom-value'>{trip.attributes.town.data.attributes.salary}</span>
									</div>
									<button className='delete-button' onClick={() => onDeleteItem(trip.id)}>Eliminar</button>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					))) : (<p className='no-data'>No se tienen viajes registrados de este mes</p>)}
				</Accordion>
			)}

		</div>
		</>
	)
}

export { TripHistory };