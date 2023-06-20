import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import truckSuccess from "../../Assets/Animations/truckSuccess.json";
import error from "../../Assets/Animations/error.json";
import "./Modal.css";

import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";


function Modal({status}) {
	const [isVisible, setIsVisible] = useState(true);

	// Hide modal transition for success and error
	useEffect(() => {
		if(!status.includes("success", "error")) return;
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [status]);

	return (
		createPortal(
			<div className={`modal ${isVisible ? "" : "hidden"}`}>
				{status === "success" ? <Player autoplay loop speed={2} src={truckSuccess} className='modal-truck-success' /> : null}
				{status === "error" ? <Player autoplay loop speed={1} src={error} className='modal-error' /> : null}
				<div className="deleteConfirmation-container">
					{status === "deleteConfirmationTrip" ? <DeleteConfirmation item="trip"/> : null}
				</div>
			</div>,
			document.getElementById("modal")
		)
	);
}

export { Modal };
