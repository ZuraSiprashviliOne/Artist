
import React from 'react';
import { connect } from 'react-redux';
import { Loading } from '../../Components/Loading';

import '../../Stylesheets/about.css';
import { INIT_ABOUT } from '../../Actions/AboutActions';
import { checkPromise } from '../../Helpers/Valid';
import { SET_NAVIGATION_CURRENT_PAGE } from '../../Actions/NavigationAction';
import { getPageSlag } from '../../Helpers/Routing';

import Particles from 'react-particles-js';

import Translate from '../Translate';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <form action="#" method="POST" className={'contactForm'}>
                <input
                    ref={(element) => {
                        this.contactName = element;
                    }}
                    type={'text'} 
                    placeholder={'Your Name'} 
                    required/>
                <input
                    ref={(element) => {
                        this.contactEmail = element;
                    }}
                    type={'email'}
                    placeholder={'Your Email'}
                    required/>
                <input
                    ref={(element) => {
                        this.contactSubject = element;
                    }}
                    placeholder={'Subject'}
                    required/>
                <textarea
                    ref={(element) => {
                        this.contactMessage = element;
                    }}
                    placeholder={'Your Message...'}
                    required/>
                <div className={'buttons'}>
                    <button
                        type={'reset'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            reset
                        </Translate>
                    </button>
                    <button
                        type={'submit'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            send
                        </Translate>
                    </button>
                </div>
            </form>
        );
    }
}

class Element extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div
                className={'animated fadeIn page'}
                id={'about'}>
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}
                    params={{
                        ...this.props.About.particles,
                        particles: {
                            ...this.props.About.particles.particles,
                            number: {
                                value: window.screen.width / 30
                            }
                        }
                    }}/>
                <div id={'aboutContent'}>
                    <div className={'leftSide'}>
                        <div className={'image'}>
                            <img src={'https://scontent.fgyd4-1.fna.fbcdn.net/v/t1.0-9/21617745_769308323268938_8169516463968774069_n.jpg?_nc_cat=0&oh=3de768d4d93fc1e8069ac07069076c70&oe=5B72FA00'}/>
                        </div>
                        <div className={'preForm'}>
                            <p className={'title'}>
                                <Translate
                                    from={this.props.language}
                                    divider={this.props.divider}>
                                    text me
                                </Translate>
                            </p>
                            <p className={'description'}>
                                <Translate
                                    from={this.props.language}
                                    divider={this.props.divider}>
                                     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Translate>
                            </p>
                        </div>
                        <ContactForm 
                            divider={this.props.divider}
                            language={this.props.language}/>
                    </div>
                    <div className={'rightSide'}>

                    </div>
                </div>
            </div>
        )
    }
}

class About extends React.Component{
    constructor(props){
        super(props);
    
        this.init = this.init.bind(this);
    }

    init(props){
        props.setPage(getPageSlag(this.props.match.path));
        if(checkPromise(props.About) === false){
            props.initAbout();
        }
    }

    componentWillMount(){
        this.init(this.props);
    }

    render(){
        if(checkPromise(this.props.About)){
            return <Element {...this.props} />;
        }else{
            return <Loading />;
        }
    }
}

const Reducers = (state) => {
    return {
        About: state.AboutReducer
    };
};
const Dispatches = (dispatch) => {
    return {
        setPage: (slag) => {
            dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
        },
        initAbout: () => {
            dispatch(INIT_ABOUT());
        }
    };
};

export default connect(Reducers,Dispatches)(About);