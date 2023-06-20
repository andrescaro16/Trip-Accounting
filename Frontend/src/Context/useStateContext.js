import { createContext, useContext, useState } from "react";

const Context = createContext();


export const StateContext = ({ children }) => {

	const [deleteItemModal, setDeleteItemModal] = useState(false);
	const [deleteTrip, setDeleteTrip] = useState(false);
	const [tokenId, setTokenId] = useState(false);


	return (
		<Context.Provider value={{
			deleteItemModal,
			setDeleteItemModal,
			deleteTrip,
			setDeleteTrip,
			tokenId,
			setTokenId,
		}}>
			{children}
		</Context.Provider>
	);

}

export const useStateContext = () => useContext(Context);