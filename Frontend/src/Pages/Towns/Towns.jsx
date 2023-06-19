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
	const [loading, setLoading] = useState(true);
	const [orderedTowns, setOrderedTowns] = useState([]);

	// ----------------------------[Get towns]----------------------------
	useEffect(() => {
		async function fetchtowns() {
			try {
				setLoading(true);
				const response = await getTowns();
				const dots = await dotsInPrices(response.data);
				setTowns(dots);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchtowns();
	}, []);

	useEffect(() => {
		setOrderedTowns(towns.sort((a, b) => {
		  const routeA = a.attributes.route.toLowerCase();
		  const routeB = b.attributes.route.toLowerCase();
		  if (routeA < routeB) {
			return -1;
		  } else if (routeA > routeB) {
			return 1;
		  } else {
			return 0;
		  }
		}));
	}, [ towns ]);
	  
	function dotsInPrices(data) {
		const towns = data?.map((town) => {
			const viatic = town.attributes.viatic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			const salary = town.attributes.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			return {
				...town,
				attributes: {
					...town.attributes,
					viatic,
					salary,
				},
			};
		});
		return towns;
	}


	return (
		<>
		<div className='towns-container'>
			<div className='towns-header-container'>

					<Player autoplay loop speed={0.7} src={house} className='house-towns' />

				<h1 className='towns-title'>Pueblos - Rutas<br/> <span>Mr. Tatan</span></h1>
			</div>
			{loading && (
				<>
					<Loading /><Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
				</>
			)}
			<Accordion variant="separated" >
				{orderedTowns?.map((town) => (
					<Accordion.Item value={`${town.id}`} key={`${town.id}`} className='accordion-item'>
						<Accordion.Control>
							<div className='control'>
								<span className='route'>{town.attributes.route}</span>
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
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
		</>
	)
}

export { Towns };