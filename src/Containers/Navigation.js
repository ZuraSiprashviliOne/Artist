
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {Loading} from '../Components/Loading';
import { SET_NAVIGATION } from '../Actions/NavigationAction';
import { checkPromise } from '../Helpers/Valid';

import Translate from './Translate';

import '../Stylesheets/navigation.css';

import FontAwesome from 'react-fontawesome';

class NavItem extends React.Component{
    render(){
        return (
            <Link
                className={'navLink'}
                to={`/pages/${this.props.slag}`}>
                <Translate
                    from={this.props.language}
                    divider={this.props.divider}>
                    {this.props.title}
                </Translate>
            </Link>
        );
    }
}

class NavMenu extends React.Component{
    constructor(props){
        super(props);

        this.getMenuItems = () => {
            let navItems = this.props.list.map((item) => {
                return (
                    <li
                        className={`navItem animated ${item.slag === this.props.currentPage ? 'active flipInY' : ''}`}
                        key={item.id}>
                        <NavItem
                            slag={item.slag}
                            title={item.title}
                            divider={this.props.divider}
                            language={this.props.language}
                            currentPage={this.props.currentPage}/>
                    </li>
                )
            });

            let langItems = this.props.locale.primary.languages.map((lang) => {
                return (
                    <li
                        key={lang}
                        className={`navItem ${this.props.locale.primary.current === lang ? 'active ': ''}`}>
                        <button
                            onClick={() => {
                                this.props.setLocale(lang);
                                this.toggleLangs();
                            }}
                            className={'navLink'}>
                            {lang}
                        </button>
                    </li>
                );
            });

            navItems.push((
                <li
                    ref={(element) => {
                        this.languagesList = element;
                    }}
                    className={'navItem language'}
                    key={'langs'}>
                    <button
                        onClick={this.toggleLangs}
                        className={'navLink'}>
                        {this.props.locale.primary.current}
                    </button>
                    <ul
                        className={'languages'}>
                        {langItems}
                    </ul>
                </li>
            ));

            navItems.push((
                <li
                    ref={(element) => {
                        this.toggler = element;
                    }}
                    className={'navItem toggler'}
                    key={'toggler'}>
                    <button
                        onClick={this.toggleNavBar}
                        className={'navLink'}>
                        <FontAwesome
                            name={'bars'}/>
                    </button>
                </li>
            ));

            return (
                <ul
                    className={'navItems'}>
                    {navItems}
                </ul>
            );
        };

        this.toggleLangs = this.toggleLangs.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
    }

    toggleLangs(){
        this.languagesList.classList.toggle('langsListVis');
    }

    toggleNavBar(){
        this.menu.classList.toggadd('toggled');
    }

    render(){
        return (
            <div
                ref={(element) => {
                    this.menu = element;
                }}
                className={'menu'}>
                {this.getMenuItems()}
            </div>
        );
    }
}

class Logo extends React.Component{

    render(){
        return (
            <div
                className={'logo'}>
                <Link
                    to={'/'}>
                    <img
                        src={this.props.image} />
                    <span>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            {this.props.title}
                        </Translate>
                    </span>
                </Link>
            </div>
        )
    }
}

class Element extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){

    }

    render(){
        return (
            <div
                className={`animated bounceInDown ${this.props.Navigation.wide ? 'wide': ''}`}
                id={'navigation'}>
                <nav
                    className={'nav'}>
                    <Logo 
                        image={this.props.Navigation.logo}
                        title={this.props.Navigation.title}
                        divider={this.props.Navigation.divider}
                        language={this.props.Navigation.language}/>
                    <NavMenu 
                        locale={this.props.Locale}
                        divider={this.props.Navigation.divider}
                        setLocale={this.props.setLocale}
                        language={this.props.Navigation.language}
                        list={this.props.Navigation.list}
                        currentPage={this.props.Navigation.currentPage}/>
                </nav>
            </div>
        );
    }
}

class Navigation extends React.Component{
    constructor(props){
        super(props);

        // this.state = {
        //     ready: () => (
        //         checkPromise(this.props.Navigation)
        //     )
        // };

        this.init = this.init.bind(this);
    }

    componentWillMount(){
        this.init(this.props);
    }

    init(props){
        if(checkPromise(this.props.Navigation) === false){
            this.props.setNavigation();
        }
    }

    render(){
        if(checkPromise(this.props.Navigation)){
            return <Element {...this.props} /> ;
        }else{
            return <Loading />;
        }
    }
}

const Reducers = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Locale: state.LocaleReducer
    };
};

const Dispatches = (dispatch) => {
    return {
        setNavigation: () => {
            dispatch(SET_NAVIGATION());
        }
    };
};

export default connect(Reducers, Dispatches)(Navigation);