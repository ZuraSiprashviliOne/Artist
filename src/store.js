
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import LocaleReducer from './Reducers/LocaleReducer';
import HomeReducer from './Reducers/HomeReducer';
import NavigationReducer from './Reducers/NavigationReducer';
import GalleryReducer from './Reducers/GalleryReducer';
import ItemReducer from './Reducers/ItemReducer';
import AboutReducer from './Reducers/AboutReducer';

export default createStore(
    combineReducers({
        LocaleReducer,
        HomeReducer,
        NavigationReducer,
        GalleryReducer,
        ItemReducer,
        AboutReducer
    }),
    {},
    applyMiddleware(
        logger,
        promise(),
        thunk
    )
)