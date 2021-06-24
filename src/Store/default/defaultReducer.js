import actionTypes from '../actionsTypes'

const initialState = {
    default: null
}

const defaultReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DEFAULT:
            return {...state, default: action.payload}
        default:
            return state
    }
}

export default defaultReducer