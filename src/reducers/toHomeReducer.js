const initialState = false;

export default (state = initialState, action) => {
    return action.hasOwnProperty('toHome') ? action.toHome : state;
}
