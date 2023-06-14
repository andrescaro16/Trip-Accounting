import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '@mantine/core';
import { Player } from '@lottiefiles/react-lottie-player';
import { getTowns } from '../../Api/api';
import { Loading } from '../../Components/Loading/Loading';
import house from '../../Assets/Animations/house.json';
import { FiEdit } from 'react-icons/fi';
import './Towns.css';


function Towns() {

	const [towns, setTowns] = useState([]);
	const [orderedTowns, setOrderedTowns] = useState([]);
	const [loading, setLoading] = useState(true);

	// ----------------------------[Get towns]----------------------------
	useEffect(() => {
		async function fetchtowns() {
			try {
				setLoading(true);
				const response = await getTowns();
				console.log(response.data);
				setTowns(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchtowns();
	}, []);


	return (
		<>
		<div className='towns-container'>
			<div className='towns-header-container'>

					<Player autoplay loop speed={0.7} src={house} className='house-towns' />

				<h1 className='towns-title'>Pueblos - Rutas<br/> <span>Mr. Tatan</span></h1>
			</div>
			{loading && (
				<>
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
				</>
			)}
			<Accordion variant="separated" >
				{towns?.map((town) => (
					<Accordion.Item value={`${town.id}`} key={`${town.id}`} className='accordion-item'>
						<Accordion.Control>
							<div className='control'>
								<span className='route'>{town.attributes.route}</span>
								<div className='right-container'>
									<Link to={`/edit-town/${town.id}`} className='edit'><FiEdit color='#111'/></Link>
								</div>
							</div>
						</Accordion.Control>
						<Accordion.Panel>
							<div className='panel'>
								<div className='panel-left'>
									<div className='panel-left-container'>
										<span className='panel-title'>Viáticos</span> <br />
										<span className='panel-left-value'>{town.attributes.viatic}</span>
									</div>
								</div>
								<div className='panel-right'>
									<div className='panel-right-container'>
										<span className='panel-title'>Salario</span> <br />
										<span className='panel-right-value'>{town.attributes.salary}</span>
									</div>
								</div>
							</div>
							<div className='panel-bottom'>
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

export { Towns };