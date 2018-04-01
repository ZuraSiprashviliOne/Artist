
const aboutReducer = (state = {
    title: null,
    language: null,
    divider: null,
    particles: {},

}, action) => {
    switch(action.type){
        
        case 'INIT_ABOUT_FULFILLED': {
            state = {
                ...state,
                ...action.payload
            };
            break;
        }

        default: {
            break;
        }
    }

    return state;
};

export default aboutReducer;