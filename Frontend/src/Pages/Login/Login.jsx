import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import truckAnimation from '../../Assets/Animations/truckAnimation.json';
import './Login.css';

function Login() {

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	function togglePassword(event) {
		event.preventDefault();
		setShowPassword(!showPassword);
	}

	function onSubmit(event) {
		event.preventDefault();
		if(event.target[0].value === `${process.env.REACT_APP_USERNAME}` && event.target[1].value === `${process.env.REACT_APP_PASSWORD}`) {
			navigate('/homepage');
		} else {
			setError(true);
		}
	}

	return (
		<div className='login-container'>

			<Lottie animationData={truckAnimation} className='login-truck-animation' />
			<h1 className='login-title'>Inicio de sesión</h1>

			<form className='login-form' onSubmit={onSubmit}>

				<div className='login-content-container'>
					<label className='login-label-username'>Nombre de usuario</label>
					<input className='login-input-username' type='text' placeholder='Nombre de usuario'/>
				</div>

				<div className='login-content-container'>
					<label className='login-label-password'>Contraseña</label>
					<input className='login-input-password' type={showPassword ? 'text' : 'password'} placeholder='Contraseña'/>
					<button type='button' className='login-toggle-button' onClick={togglePassword} >
						{showPassword ? 'Ocultar' : 'Mostrar'}
					</button>
				</div>

				{error && <p className='login-error'>Usuario o contraseña incorrectos</p>}

				<button type="submit" className="login-button"> Iniciar sesión </button>

			</form>

		</div>
	)
}

export { Login };