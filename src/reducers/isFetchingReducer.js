const initialState = false;

export default (state = initialState, action) => {
    return (typeof(action.isFetching) === 'boolean') ? action.isFetching : state;
}
