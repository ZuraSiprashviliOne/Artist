
const aboutReducer = (state = {
    title: null,
    language: null,
    divider: null,
    particles: {},
    user: null,
    textBlock: null,
    about: null
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