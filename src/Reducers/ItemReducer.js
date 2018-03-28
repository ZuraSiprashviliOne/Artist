
const itemReducer = (state = {
    divider: null,
    language: null,
    item: null,
    images: null,
    particles: {},
    id: null
}, action) => {
    switch(action.type){
        case 'UNSET_ITEM': {
            state = {
                ...state,
                ...action.payload
            };
            break;
        }
        case 'ADD_COMMENT_FULFILLED': {
            if(action.payload){
                state = {
                    ...state,
                    item: {
                        ...state.item,
                        comms: [
                            action.payload,
                            ...state.item.comms
                        ],
                        comments: ++state.item.comments
                    }
                };
            }
            break;
        }
        case 'LIKE_ITEM_FULFILLED': {
            if(action.payload.liked){
                state = {
                    ...state,
                    item: {
                        ...state.item,
                        liked: true,
                        likes: ++state.item.likes
                    }
                };
            }
            break;
        }
        case 'INIT_ITEM_FULFILLED': {
            state = {
                ...state,
                ...action.payload
            };
            break;
        }
        case 'SET_ITEM_IMAGES_FULFILLED': {
            state = {
                ...state,
                images: action.payload
            };
            break;
        }
        case 'SET_ITEM_ITEM_FULFILLED': {
            state = {
                ...state,
                item: action.payload
            };
            break;
        }
        case 'SET_ITEM_COMMENTS_FULFILLED': {
            state = {
                ...state,
                comments: action.payload
            };
            break;
        }
        case 'SET_ITEM_FEATURED_FULFILLED': {
            state = {
                ...state,
                featured: action.payload
            };
            break;
        }
        case 'SET_ITEM_ID': {
            state = {
                ...state,
                id: action.payload
            };
            break;
        }
        case 'SEEN_ITEM_FULFILLED': {
            state = {
                ...state,
                item: {
                    ...state.item,
                    seens: action.payload.seen === true? ++state.item.seens : state.item.seens,
                    seen: true
                }
            };
            break;
        }
        default: {

            break;
        }
    }
    return state;
};

export default itemReducer;