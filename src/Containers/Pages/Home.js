
import React from 'react';
import { connect } from 'react-redux';

import {Loading} from '../../Components/Loading';
import { SET_HOME_HEADER } from '../../Actions/HomeActions';
import { checkPromise } from '../../Helpers/Valid';

import Translate from '../Translate';

import Particles from 'react-particles-js';
import { SET_NAVIGATION_CURRENT_PAGE } from '../../Actions/NavigationAction';


import '../../Stylesheets/home.css';
import { getPageSlag } from '../../Helpers/Routing';

class Element extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div
                className={'page animated fadeIn'}
                id={'home'}>
                <header
                    style={{backgroundImage: `url(${this.props.Home.header.background})`}}
                    className={'header'}>
                    <Particles
                        className={'particles-wrapper'}
                        canvasClassName={'particles-canvas'}
                        params={{
                            ...this.props.Home.header.particles,
                            particles: {
                                ...this.props.Home.header.particles.particles,
                                number: {
                                    value: window.screen.width / 10
                                }
                            }
                        }}/>
                    <div
                        className={'texts'}>
                        <div
                            className={'brand'}>
                            <div
                                className={'logo'}>
                                <img
                                    src={this.props.Home.header.logo}
                                    alt={'logo'} />
                            </div>
                            <div
                                className={'text'}>
                                <Translate
                                    divider={this.props.Home.header.divider}
                                    from={this.props.Home.header.language}>
                                    {this.props.Home.header.title}
                                </Translate>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

class Home extends React.Component{
    constructor(props){
        super(props);

        // this.state = {
        //     ready: () => (
        //         checkPromise(this.props.Home.header)
        //     )
        // };

        this.init = this.init.bind(this);
    }

    componentWillMount(){
        this.init(this.props);
    }

    init(props){
        this.props.setPage(getPageSlag(this.props.match.path));
        if(checkPromise(this.props.Home.header) === false){
            this.props.setHomeHeader();
        }
    }

    render(){
        if(Object.values(this.props.Home.header).every((item) => item !== null)){
            return <Element {...this.props} />;
        }else{
            return <Loading />;
        }
    }
}

const Reducers = (state) => {
    return {
        Home: state.HomeReducer
    };
};

const Dispatches = (dispatch) => {
    return {
        setPage: (slag) => {
            dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
        },
        setHomeHeader: () => {
            dispatch(SET_HOME_HEADER());
        }
    };
};

export default connect(Reducers, Dispatches)(Home);