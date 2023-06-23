import React, { useEffect } from 'react';
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';
import { Player } from '@lottiefiles/react-lottie-player';
import moneyWallet from '../../Assets/Animations/moneyWallet.json';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { getTrips } from '../../Api/api';
import { LoadingCircle } from '../../Components/LoadingCircle/LoadingCircle';
import './Analytics.css';


function Analytics() {

	const [loading, setLoading] = useState(true);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [trips, setTrips] = useState([]);
	const [tripsByMonth, setTripsByMonth] = useState([]);
	const [firstBiweekly, setFirstBiweekly] = useState([]);
	const [secondBiweekly, setSecondBiweekly] = useState([]);
	const [monthData, setMonthData] = useState({});
	const [firstBiweeklyData, setFirstBiweeklyData] = useState({});
	const [secondBiweeklyData, setSecondBiweeklyData] = useState({});

	// -----------------------------------[Get trips]----------------------------------------
	useEffect(() => {
		const fetchTrips = async () => {
		  try {
			  const response = await getTrips();
			  setTrips(response.data);
			} catch (error) {
				console.log(error);
		  }
		};
		fetchTrips();
	}, []);
	
	// -------------------------------[On change event]--------------------------------------
	function onChangeSelectedDate(e) {
		setLoading(true);
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
		const firstBiweekly = tripsOfSelectedMonth.filter((trip) => {
			const tripDate = addDays(new Date(trip.attributes.date), 1);
			const biweekly = getBiweekly(tripDate);
			return biweekly === "first";
		});
		setFirstBiweekly(firstBiweekly);
		const secondBiweekly = tripsOfSelectedMonth.filter((trip) => {
			const tripDate = addDays(new Date(trip.attributes.date), 1);
			const biweekly = getBiweekly(tripDate);
			return biweekly === "second";
		});
		setSecondBiweekly(secondBiweekly);
	}, [ trips, selectedDate ]);

	// -----------------------------------[Get data to display]----------------------------------------
	useEffect(() => {
		let monthData = {
			salary: 0,
			viatic: 0,
			quantityTrips: tripsByMonth.length,
		}
		tripsByMonth.forEach((trip) => {
			const { town, toll, extraCost } = trip.attributes;
			const { salary, viatic } = town.data.attributes;
			const { price: priceToll } = toll || 0;
			const { price: priceExtraCost } = extraCost || 0;
			monthData.salary += salary;
			monthData.viatic += viatic + (priceToll || 0) + (priceExtraCost || 0);
		});
		monthData =  dotsInPrices(monthData);
		setMonthData(monthData);
	}, [ tripsByMonth ]);

	useEffect(() => {
		let firstBiweeklyData = {
			salary: 0,
			viatic: 0,
			quantityTrips: firstBiweekly.length,
		}
		firstBiweekly.forEach((trip) => {
			const { town, toll, extraCost } = trip.attributes;
			const { salary, viatic } = town.data.attributes;
			const { price: priceToll } = toll || 0;
			const { price: priceExtraCost } = extraCost || 0;
			firstBiweeklyData.salary += salary;
			firstBiweeklyData.viatic += viatic + (priceToll || 0) + (priceExtraCost || 0);
		});
		firstBiweeklyData =  dotsInPrices(firstBiweeklyData);
		setFirstBiweeklyData(firstBiweeklyData);
	}, [ firstBiweekly ]);

	useEffect(() => {
		let secondBiweeklyData = {
			salary: 0,
			viatic: 0,
			quantityTrips: secondBiweekly.length,
		}
		secondBiweekly.forEach((trip) => {
			const { town, toll, extraCost } = trip.attributes;
			const { salary, viatic } = town.data.attributes;
			const { price: priceToll } = toll || 0;
			const { price: priceExtraCost } = extraCost || 0;
			secondBiweeklyData.salary += salary;
			secondBiweeklyData.viatic += viatic + (priceToll || 0) + (priceExtraCost || 0);
		});
		secondBiweeklyData =  dotsInPrices(secondBiweeklyData);
		setSecondBiweeklyData(secondBiweeklyData);

		setLoading(false);
	}, [ secondBiweekly ]);

	
	// -----------------------------------[Functions and constants]----------------------------------------

	function dotsInPrices(data) {
		data.salary ? data.salary = data.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : data.salary = 0;
		data.viatic ? data.viatic = data.viatic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : data.viatic = 0;
		return data;
	}

	const biWeeklies = {
		FIRST: "first",
		SECOND: "second",
	}

	const months = {
		0: "Enero",
		1: "Febrero",
		2: "Marzo",
		3: "Abril",
		4: "Mayo",
		5: "Junio",
		6: "Julio",
		7: "Agosto",
		8: "Septiembre",
		9: "Octubre",
		10: "Noviembre",
		11: "Diciembre",
	}

	function addDays(date, days){
		date.setDate(date.getDate() + days);
		return date;
	}

	function getEndOfMonth(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		return new Date(year, month + 1, 0);
	}

	function getBiweekly(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const lastDayOfMonth = getEndOfMonth(date);
		const numDaysOfMonth = lastDayOfMonth.getDate();
		if(day <= 15){
			return biWeeklies.FIRST;
		} else if(day > 15 && day <= numDaysOfMonth){
			return biWeeklies.SECOND;
		}
	}


	return (
		<>
			<div className='analytics-container'>

				<Player autoplay loop speed={0.7} src={moneyWallet} className='money-wallet-analytics' />
				<h1 className='analytics-title'>Viáticos y salarios</h1>
				<MonthPickerInput
					placeholder="Mes"
					icon={<FaRegCalendarAlt />}
					description="Selecciona el mes del que deseas ver información"
					radius="md"
					className='month-picker-input'
					value={selectedDate}
					onChange={onChangeSelectedDate}
				/>
				
				{loading ? (<LoadingCircle />) : (
					<div className='analytics'>
						{monthData.quantityTrips !== 0 ? (
							<>
								<div className='elem-analytics'>
									<h2 className='elem-analytics-title'>Mes de {months[selectedDate.getMonth()]}</h2>
									<p> <span className='elem-analytics-text'>Salario del mes:</span> ${monthData.salary}</p>
									<p> <span className='elem-analytics-text'>Viáticos del mes:</span> ${monthData.viatic}</p>
									<p> <span className='elem-analytics-text'>Cantidad de viajes del mes:</span> {monthData.quantityTrips}</p>
								</div>

								<div className='elem-analytics'>
									<h2 className='elem-analytics-title'>Primera quincena</h2>
									{firstBiweeklyData.quantityTrips !== 0 ? (
										<>
											<p> <span className='elem-analytics-text'>Salario:</span> ${firstBiweeklyData.salary}</p>
											<p> <span className='elem-analytics-text'>Viáticos:</span> ${firstBiweeklyData.viatic}</p>
											<p> <span className='elem-analytics-text'>Cantidad de viajes:</span> {firstBiweeklyData.quantityTrips}</p>
										</>
									) : (<p className='no-data'>No se tienen viajes registrados de esta quincena</p>)}
								</div>

								<div className='elem-analytics'>
									<h2 className='elem-analytics-title'>Segunda quincena</h2>
									{secondBiweeklyData.quantityTrips !== 0 ? (
										<>
											<p> <span className='elem-analytics-text'>Salario:</span> ${secondBiweeklyData.salary}</p>
											<p> <span className='elem-analytics-text'>Viáticos:</span> ${secondBiweeklyData.viatic}</p>
											<p> <span className='elem-analytics-text'>Cantidad de viajes:</span> {secondBiweeklyData.quantityTrips}</p>
										</>
									) : (<p className='no-data'>No se tienen viajes registrados de esta quincena</p>)}
								</div>
							</>
						) : (<p className='no-data'>No se tienen viajes registrados de este mes</p>)}
					</div>
				)}

			</div>
		</>
	);
}

export { Analytics };