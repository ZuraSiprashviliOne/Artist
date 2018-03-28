
const homeReducer = (state = {
    header: {
        divider: null,
        language: null,
        title: null,
        logo: null,
        background: null,
        particles: null
    }
}, action) => {
    switch(action.type){
        case 'SET_HOME_HEADER_FULFILLED': {
            state = {
                ...state,
                header: {
                    ...state.header,
                    ...action.payload
                }
            };
            break;
        }

        default: {
            break;
        }
    }

    return state;
}

export default homeReducer;