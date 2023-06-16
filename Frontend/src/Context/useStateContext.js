import { createContext, useContext, useState } from "react";

const Context = createContext();


export const StateContext = ({ children }) => {

	const [deleteItemModal, setDeleteItemModal] = useState(false);
	const [deleteTrip, setDeleteTrip] = useState(false);
	const [deleteTown, setDeleteTown] = useState(false);


	return (
		<Context.Provider value={{
			deleteItemModal,
			setDeleteItemModal,
			deleteTrip,
			setDeleteTrip,
			deleteTown,
			setDeleteTown,
		}}>
			{children}
		</Context.Provider>
	);

}

export const useStateContext = () => useContext(Context);