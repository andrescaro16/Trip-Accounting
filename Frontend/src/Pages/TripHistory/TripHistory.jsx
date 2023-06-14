import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '@mantine/core';
import { Player } from '@lottiefiles/react-lottie-player';
import { getTrips } from '../../Api/api';
import truck from '../../Assets/Animations/truckDriving.json';
import { FiEdit } from 'react-icons/fi';
import './TripHistory.css';


function TripHistory() {

	const [trips, setTrips] = useState([]);

	// ----------------------------[Get trips]----------------------------
	useEffect(() => {
		async function fetchTrips() {
			try {
				const response = await getTrips();
				setTrips(response.data);
				console.log("Hey", response.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchTrips();
	}, []);

	return (
		<>
		<div className='trip-history-container'>
			<div className='trip-history-header-container'>

					<Player autoplay loop speed={0.7} src={truck} className='truck-trip-history' />

				<h1 className='trip-history-title'>Historial de viajes<br/> <span>Mr. Tatan</span></h1>
			</div>
			<Accordion variant="separated" >
				{trips?.map((trip) => (
					<Accordion.Item value={`${trip.id}`} key={`${trip.id}`} className='accordion-item'>
						<Accordion.Control>
							<div className='control'>
								<span className='route'>{trip.attributes.town.data.attributes.route}</span>
								<div className='right-container'>
									<span className='date'>{trip.attributes.date}</span>
									<Link to={`/edit-trip/${trip.id}`} className='edit'><FiEdit color='#111'/></Link>
								</div>
							</div>
						</Accordion.Control>
						<Accordion.Panel>
							<div className='panel'>
								<div className='panel-left'>
									<div className='panel-left-container'>
										<span className='panel-title'>Fecha</span> <br />
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
								<button className='delete-button'>Eliminar</button>
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
		</>
	)
}

export { TripHistory };