const initialState = false;

export default (state = initialState, action) => {
    return action.hasOwnProperty('isFetching') ? action.isFetching : state;
}
