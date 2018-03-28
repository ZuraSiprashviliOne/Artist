
const galleryReducer = (state = { 
    title: null,
    divider: null,
    language: null,
    categories: null,
    particles: {},
    options: {
        cols: 3
    },
    current: {
        categorySlag: null,
        items: null
    }
}, action) => {
    switch(action.type){
        case 'SET_GALLERY_FULFILLED': {
            state = {
                ...state,
                ...action.payload
            };
            break;
        }
        case 'SET_GALLERY_CURRENT_CATEGORY_SLAG': {
            state = {
                ...state,
                current: {
                    ...state.current,
                    categorySlag: action.payload
                }
            };
            break;
        }

        case 'SET_GALLERY_OPTIONS_COLS': {
            state = {
                ...state,
                options: {
                    ...state.options,
                    cols: action.payload
                }
            };
            break;
        }

        case 'SET_GALLERY_CURRENT_ITEMS_FULFILLED': {
            state = {
                ...state,
                current: {
                    ...state.current,
                    items: action.payload
                }
            };
            break;
        }

        case 'LIKE_GALLERY_ITEM_FULFILLED': {
            if(action.payload.liked){
                state = {
                    ...state,
                    current: {
                        ...state.current,
                        items: state.current.items.map((item) => {
                            if(item.id === action.payload.id){
                                item = {
                                    ...item,
                                    likes: ++item.likes,
                                    liked: true
                                };
                            }
                            return item;
                        })
                    }
                };
            }
            break;
        }

        default: {
            break;
        }
    }

    return state;
};

export default galleryReducer;