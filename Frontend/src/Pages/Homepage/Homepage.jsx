import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import phoneTruckAnimation from '../../Assets/Animations/phoneTruckAnimation.json';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {

	return (
		<div className='homepage-container'>
			<Player autoplay loop speed={0.7} src={phoneTruckAnimation} className='homepage-phone-truck-animation' />
			<h1 className='homepage-title'>Bienvenido Jonnathan Alvarez</h1>
			<h3 className='homepage-subtitle'>¿Qué deseas hacer?</h3>
			<div className='homepage-buttons-container'>
				<Link to='/add-trip' className='homepage-button'>Añadir viaje</Link>
				<Link to='/report' className='homepage-button'>Ver viáticos y salarios</Link>
				<Link to='/trip-history' className='homepage-button'>Ver historial de viajes</Link>
				<Link to='/towns' className='homepage-button'>Ver pueblos</Link>
			</div>
		</div>
	)
}

export { Homepage };