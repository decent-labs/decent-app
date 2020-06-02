const initialState = {
    currentPrescription: {

    }
};

function setData(state = initialState, action) {
    return {
	currentPrescription: action.data
    }
}

export { initialState, setData };
