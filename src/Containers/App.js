
import React from 'react';
import { connect } from 'react-redux';

import { reactLocalStorage as Storage } from 'reactjs-localstorage';

import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
 } from 'react-router-dom';

import {
    INIT_LOCALE,
    SET_LOCALE_PRIMARY_CURRENT,
    SET_LOCALE_PRIMARY_KEYWORDS_RES
} from "../Actions/LocaleActions";

import {Loading} from '../Components/Loading';
import {Scrollbar} from '../Components/Scrollbar';
import Translate from './Translate';

import 'normalize.css';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import '../Stylesheets/style.css';

import 'react-id-swiper/src/styles/css/swiper.css';

import Pages from './Pages';

import Navigation from './Navigation';
import { checkPromise } from '../Helpers/Valid';
import { SET_NAVIGATION_WIDE } from '../Actions/NavigationAction';

class Element extends React.Component{ 
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div 
                id={'App'}
                className={'Application animated fadeIn'}>
                <Scrollbar
                    onScroll={(event) => {
                        if(event.target.scrollTop > 100){
                            if(!this.props.Navigation.wide){
                                this.props.setNavbar(true);
                            }
                        }else{
                            if(this.props.Navigation.wide){
                                this.props.setNavbar(false);
                            }
                        }
                    }}>
                    <Router>
                        <div id={'RoterContainer'}>
                            <Navigation 
                                setLocale={this.props.setLocale}/>
                            <Switch>
                                <Route
                                    path={'/pages/home_page'}
                                    exact={true}
                                    component={Pages.Home} />
                                <Route
                                    path={'/'}
                                    exact={true}
                                    component={() => (
                                        <Redirect to={'/pages/home_page'}/>
                                    )}/>
                                <Route 
                                    path={'/pages/gallery_page'}
                                    exact={true}
                                    component={Pages.Gallery}/>
                                <Route
                                    path={'/pages/gallery_page/:category'}
                                    exact={true}
                                    component={Pages.Gallery}/>
                                <Route
                                    path={'/pages/gallery_item/:itemId'}
                                    exact={true}
                                    component={Pages.Item}/>
                            </Switch>
                        </div>
                    </Router>
                </Scrollbar>
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready: () => {
                return (
                    checkPromise(this.props.Locale.primary)
                );
            }
        }
    }

    componentDidMount(){
    }

    componentWillMount(){
        this.props.initLocale(() => {
            if(!this.props.Locale.current){
                this.props.setLocale(this.props.Locale.default);
            }
        });
    }
    
    render(){
        return this.state.ready() ? <Element {...this.props}/> : <Loading />;
    }
}

const Reducers = (state) => {
    return {
        Locale: state.LocaleReducer,
        Navigation: state.NavigationReducer
    };
};

const Dispatches = (dispatch) => {
    return {
        initLocale: (callback) => {
            dispatch(INIT_LOCALE());
            callback();
        },
        setLocale: (code) => {
            let storageLocale = Storage.get('locale');
            if(!code){
                code = storageLocale;
                dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
                dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
            }
            if(storageLocale !== code){
                dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
                dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
                Storage.set('locale', code);
            }
        },
        setNavbar: (b) => {
            dispatch(SET_NAVIGATION_WIDE(b));
        }
    };
};

export default connect(Reducers, Dispatches)(App);