import React from 'react';

function Report() {

// 	// Listado de viajes con sus viáticos, salarios y fechas
// 	const viajes = [
// 	{ fecha: new Date('2023-02-03'), viatico: 100, salario: 500 },
// 	{ fecha: new Date('2023-02-10'), viatico: 150, salario: 600 },
// 	{ fecha: new Date('2023-02-20'), viatico: 200, salario: 700 },
// 	// ... otros viajes
//   	];
  
//   // Función para obtener la suma de viáticos y salarios en una quincena específica
//   function obtenerSumaQuincena(quincenaInicio, quincenaFin) {
// 	let sumaViaticos = 0;
// 	let sumaSalarios = 0;
  
// 	viajes.forEach((viaje) => {
// 	  const fechaViaje = viaje.fecha;
  
// 	  if (fechaViaje >= quincenaInicio && fechaViaje <= quincenaFin) {
// 		sumaViaticos += viaje.viatico;
// 		sumaSalarios += viaje.salario;
// 	  }
// 	});
  
// 	return {
// 	  sumaViaticos,
// 	  sumaSalarios,
// 	};
//   }
  
//   // Función para obtener el inicio y fin de una quincena en un mes específico
//   function obtenerQuincenaEnMes(mes, quincenaIndex) {
// 	const year = new Date().getFullYear();
// 	const primerDiaMes = new Date(year, mes, 1);
// 	const ultimoDiaMes = new Date(year, mes + 1, 0);
  
// 	const quincenaInicio = new Date(year, mes, quincenaIndex * 15 + 1);
// 	const quincenaFin = new Date(year, mes, (quincenaIndex + 1) * 15);
  
// 	if (quincenaFin > ultimoDiaMes) {
// 	  quincenaFin.setDate(ultimoDiaMes.getDate());
// 	}
  
// 	return {
// 	  quincenaInicio,
// 	  quincenaFin,
// 	};
//   }
  
//   // Ejemplo de uso para la primera quincena de cada mes
//   for (let mes = 0; mes < 12; mes++) {
// 	const { quincenaInicio, quincenaFin } = obtenerQuincenaEnMes(mes, 0);
// 	const resultado = obtenerSumaQuincena(quincenaInicio, quincenaFin);
// 	console.log(`Mes: ${mes + 1}`);
// 	console.log('Suma de viáticos:', resultado.sumaViaticos);
// 	console.log('Suma de salarios:', resultado.sumaSalarios);
//   }


const viajes = [
	{ fecha: new Date('2023-02-03'), viatico: 100, salario: 500 },
	{ fecha: new Date('2023-02-10'), viatico: 150, salario: 600 },
	{ fecha: new Date('2023-02-20'), viatico: 200, salario: 700 },
	// ... otros viajes
  ];
  
  function obtenerSumaQuincena(quincenaInicio, quincenaFin) {
	let sumaViaticos = 0;
	let sumaSalarios = 0;
  
	viajes.forEach((viaje) => {
	  const fechaViaje = viaje.fecha;
  
	  if (fechaViaje >= quincenaInicio && fechaViaje <= quincenaFin) {
		sumaViaticos += viaje.viatico;
		sumaSalarios += viaje.salario;
	  }
	});
  
	return {
	  sumaViaticos,
	  sumaSalarios,
	};
  }
  
  function obtenerQuincenaEnMes(mes, quincenaIndex) {
	const year = new Date().getFullYear();
	const primerDiaMes = new Date(year, mes, 1);
	const ultimoDiaMes = new Date(year, mes + 1, 0);
	const numDiasMes = ultimoDiaMes.getDate();
  
	const quincenaInicio = new Date(year, mes, quincenaIndex * 15 + 1);
	const quincenaFin = new Date(year, mes, (quincenaIndex + 1) * 15);
  
	if (quincenaFin > ultimoDiaMes) {
	  quincenaFin.setDate(numDiasMes);
	}
  
	return {
	  quincenaInicio,
	  quincenaFin,
	};
  }
  
  // Método para obtener el número de días en un mes específico
  function getMonthDays(year, month) {
	return new Date(year, month + 1, 0).getDate();
  }
  
  // Ejemplo de uso para la primera quincena de cada mes
  for (let mes = 0; mes < 12; mes++) {
	const year = new Date().getFullYear();
	const numDiasMes = getMonthDays(year, mes);
	const { quincenaInicio, quincenaFin } = obtenerQuincenaEnMes(mes, 0);
  
	if (quincenaFin.getDate() > numDiasMes) {
	  quincenaFin.setDate(numDiasMes);
	}
  
	const resultado = obtenerSumaQuincena(quincenaInicio, quincenaFin);
	console.log(`Mes: ${mes + 1}`);
	console.log('Suma de viáticos:', resultado.sumaViaticos);
	console.log('Suma de salarios:', resultado.sumaSalarios);
  }

	return (
		<div>Report</div>
	)
}

export { Report };