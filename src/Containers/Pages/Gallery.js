
import React from 'react';
import { connect } from 'react-redux';

import {Loading} from '../../Components/Loading';

import { Link, Redirect } from 'react-router-dom';

import {SET_NAVIGATION_CURRENT_PAGE} from '../../Actions/NavigationAction';
import { getPageSlag } from '../../Helpers/Routing';

import Particles from 'react-particles-js';

import '../../Stylesheets/gallery.css';
import Translate from '../Translate';
import { SET_GALLERY, SET_GALLERY_CURRENT_CATEGORY_SLAG, SET_GALLERY_CURRENT_ITEMS, LIKE_GALLERY_ITEM, SET_GALLERY_OPTIONS_COLS } from '../../Actions/GalleryActions';
import { checkPromise } from '../../Helpers/Valid';

import FontAwesome from 'react-fontawesome';

import ImagesLoaded from 'react-on-images-loaded';

class CatItem extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return (
            <li className={`listItem animated ${this.props.slag === this.props.current ? 'active flipInY' : ''}`}>
                <Link
                    to={`/pages/gallery_page/${this.props.slag}`}>
                    <Translate
                        from={this.props.language}
                        divider={this.props.divider}>
                        {this.props.title}
                    </Translate>
                </Link>
            </li>
        );
    }
}

class GalleryNavigation extends React.Component{
    constructor(props){
        super(props);

        this.getList = () => {
            let listItems = this.props.categories.map((category) => {
                return (
                    <CatItem
                        divider={this.props.divider}
                        language={this.props.language}
                        current={this.props.current}
                        key={category.id}
                        {...category}/>
                );
            });
            listItems.unshift((
                <li
                    key={'all'}
                    className={`listItem animated ${this.props.current === 'all' ? 'active flipInY': ''}`}>
                    <Link
                        to={'/pages/gallery_page/all'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            all
                        </Translate>
                    </Link>
                </li>
            ))

            return (
                <ul className={'list'}>
                    {listItems}
                </ul>
            );
        };
    }

    render(){
        return (
            <div
                className={'galleryNavigation'}>
                <div className={'title'}>
                    <Link
                        to={'/pages/gallery_page/all'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            {this.props.title}
                        </Translate>
                    </Link>
                </div>
                <div className={'categories'}>
                    {this.getList()}
                </div>
            </div>
        );
    }
}

class GalleryItem extends React.Component{
    constructor(props){
        super(props);

        this.getCategories = () => {
            return this.props.categories.map((category) => {
                return (
                    <div
                        className={'categoryItem'}
                        key={category.id}>
                        <Link
                            className={'category'}
                            to={`/pages/gallery_page/${category.slag}`}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                {category.title}
                            </Translate>
                        </Link>
                    </div>
                );
            });
        };

        this.toggleInfo = this.toggleInfo.bind(this);
        this.love = this.love.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    toggleInfo(event){
        if(this.droper.children[0].classList.contains('fa-chevron-down')){
            this.droper.children[0].classList.remove('fa-chevron-down');
            this.droper.children[0].classList.add('fa-chevron-up');
        }else{
            this.droper.children[0].classList.add('fa-chevron-down');
            this.droper.children[0].classList.remove('fa-chevron-up');
        }
        this.info.classList.toggle('active');
        this.droper.classList.toggle('active');
    }

    love(event){
        if(!this.props.liked){
            this.props.like(this.props.id);
        }
    }

    getDate(dateString){
        let date = new Date(dateString);

        let resDate = [date.getDay(), date.getMonth(), date.getFullYear()];

        return resDate.join('/');
    }

    render(){
        return (
            <div
                key={this.props.id}
                className={'data-item listItem animated fadeIn'}>
                <div
                    className={'image'}>
                    <img
                        src={this.props.image}
                        alt={this.props.title} />
                    <div
                        className={'droper'}>
                        <button
                            ref={(element) => {
                                this.droper = element;
                            }}
                            onClick={this.toggleInfo}
                            className={'dropIcon'}>
                            <FontAwesome
                                name={'chevron-down'}/>
                        </button>
                    </div>
                    <div
                        className={'loveIt'}>
                        <button
                            ref={(element) => {
                                this.loveIt = element;
                            }}
                            disabled={this.props.liked}
                            className={`loveIcon ${this.props.liked ? 'active': ''}`}
                            onClick={this.love}>
                            <FontAwesome
                                name={'heart'}/>
                        </button>
                    </div>
                </div>
                <div
                    ref={(element) => {
                        this.info = element;
                    }}
                    className={'info'}>
                    {this.props.title ? (
                        <div
                            className={'title'}>
                            <Link
                                to={`/pages/gallery_item/${this.props.id}`}>
                                <Translate
                                    from={this.props.language}
                                    divider={this.props.divider}>
                                    {this.props.title}
                                </Translate>
                            </Link>
                        </div>
                    ): null}
                    <div className={'titleInfos'}>
                        <div
                            className={'date w-icon'}>
                            <FontAwesome
                                name={'calendar'} />
                            <span>
                                {this.getDate(this.props.created_at)}
                            </span>
                        </div>
                        <div
                            className={'seens w-icon'}>
                            <FontAwesome
                                name={'eye'} />
                            <span>
                                <Translate
                                    divider={' '}
                                    language={this.props.language}>
                                    {this.props.seens + ' viewed'}
                                </Translate>
                            </span>
                        </div>
                        {
                            this.props.seen ? (
                                <div
                                    className={'seened w-icon'}>
                                    <FontAwesome
                                        name={'check'} />
                                    <span>
                                        <Translate
                                            divider={' '}
                                            language={this.props.language}>
                                            seen
                                        </Translate>
                                    </span>
                                </div>
                            ): null
                        }
                    </div>
                    {this.props.short_description ? (
                        <div
                            className={'description'}>
                            {/* <Translate
                                inner={true}
                                from={this.props.language}
                                divider={this.props.divider}> */}
                                <div 
                                    dangerouslySetInnerHTML={{__html: this.props.short_description}}
                                    className={'desc-text'} />
                            {/* </Translate> */}
                        </div>
                    ): null}
                    {this.props.categories.length > 0 ?(
                        <div
                            className={'item_categories'}>
                            {this.getCategories() }
                        </div>
                    ) : null}
                    <div className={'metas'}>
                        <div className={'metaItems'}>
                            <div className={'meta w-icon'}>
                                <Link
                                    to={`/pages/gallery_item/${this.props.id}`}>
                                    <FontAwesome
                                        name={'comment'}/>
                                    <span>
                                        <Translate
                                            from={this.props.language}
                                            divider={' '}>
                                            {this.props.comments + ' comments'}
                                        </Translate>
                                    </span>
                                </Link>
                            </div>
                            <div className={'meta w-icon'}>
                                <FontAwesome
                                    name={'thumbs-up'}/>
                                <span>
                                    <Translate
                                        from={this.props.language}
                                        divider={' '}>
                                        {this.props.likes + ' likes'}
                                    </Translate>
                                </span>
                            </div>
                        </div>
                        <div className={'readMore'}>
                            <Link
                                to={`/pages/gallery_item/${this.props.id}`}>
                                <Translate
                                    from={this.props.language}
                                    divider={this.props.divider}>
                                    read more
                                </Translate>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class GalleryData extends React.Component{
    constructor(props){
        super(props);

        this.getColumnItems = (columnIndex, columns) => {
            let validItems = this.props.items.filter(
                (item, itemIndex) => (
                    itemIndex % columns === columnIndex
                )
            );
            return validItems.map((item) => {
                return (
                    <GalleryItem
                        {...item}
                        key={item.id}
                        columns={columns}
                        divider={this.props.divider}
                        like={this.props.like}
                        language={this.props.language}/>
                );
            });
        };

        this.getDataColumns = () => {
            let columns = [];
            for(let i = 0; i < this.props.options.cols; i++){
                columns.push((
                    <ul
                        key={`data-column-${i}`}
                        className={'data-column list'}>
                        {this.getColumnItems(i, this.props.options.cols)}
                    </ul>
                ));
            }
            return columns;
        }
    }

    render(){
        return (
            <div 
                className={'galleryData'}>
                {this.getDataColumns()}
            </div>
        );
    }
}

class Element extends React.Component{
    constructor(props){
        super(props);

        this.imagesLoaded = this.imagesLoaded.bind(this);
        this.imagesTimeout = this.imagesTimeout.bind(this);

        this.state = {
            showImages: false
        }
    }

    imagesLoaded(event){
        this.setState({showImages: true});
    }

    imagesTimeout(event){
        
    }

    render(){
        return (
            <main
                id={'gallery'}
                className={'page animated fadeIn'}>
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}
                    params={{
                        ...this.props.Gallery.particles,
                        particles: {
                            ...this.props.Gallery.particles.particles,
                            number: {
                                value: window.screen.width / 30
                            }
                        }
                    }}/>
                <div id={'galleryContent'}>
                    <GalleryNavigation
                        language={this.props.Gallery.language}
                        divider={this.props.Gallery.divider}
                        title={this.props.Gallery.title}
                        current={this.props.Gallery.current.categorySlag}
                        categories={this.props.Gallery.categories}/>
                        <ImagesLoaded
                            onLoaded={this.imagesLoaded}
                            onTimeout={this.imagesTimeout}
                            timeout={700}>
                            {this.state.showImages ? (
                                <GalleryData
                                    language={this.props.Gallery.language}
                                    divider={this.props.Gallery.divider}
                                    items={this.props.Gallery.current.items}
                                    options={this.props.Gallery.options}
                                    like={this.props.likeGalleryItem}/>
                            ): (
                                <Loading />
                            )}
                        </ImagesLoaded>
                </div>
            </main>
        )
    }
}

class Gallery extends React.Component{
    constructor(props){
        super(props);

        this.init = this.init.bind(this);
    }

    componentWillMount(){
        this.props.setGallery();
        this.init(this.props);
    }

    componentWillReceiveProps(props){
        this.init(props);
    }

    init(props){
        if(this.props.Gallery.current.categorySlag !== props.match.params.category){
            this.props.setPage(getPageSlag(props.match.path));
            if(this.props.Gallery.current.categorySlag !== props.match.params.category){
                this.props.setGalleryCurrentCategorySlag(props.match.params.category);
                this.props.setGalleryCurrentItems(props.match.params.category);
            }
            if((checkPromise(this.props.Gallery)
            && this.props.Gallery.current.items ? 
                this.props.Gallery.current.items.every((item) => item !== null)
                : false) === false){
                if(window.screen.width < 900){
                    this.props.setGalleryOptionsCols(1);
                }else if(window.screen.width < 1333 && window.screen.width > 900){
                    this.props.setGalleryOptionsCols(2);
                }
            }
        }
    }

    render(){
        if(this.props.match.params.category){
            if(checkPromise(this.props.Gallery)
                    && this.props.Gallery.current.items ? 
                        this.props.Gallery.current.items.every((item) => item !== null)
                        : false){
                return <Element {...this.props}/>;
            }else{
                return <Loading />;
            }
        }else{
            return <Redirect to={'/pages/gallery_page/all'}/>;
        }
    }
}

const Reducers = (state) => {
    return {
        Gallery: state.GalleryReducer
    };
};
const Dispatches = (dispatch) => {
    return {
        setPage: (slag) => {
            dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
        },
        setGallery: () => {
            dispatch(SET_GALLERY());
        },
        setGalleryCurrentCategorySlag: (slag = 'all') => {
            dispatch(SET_GALLERY_CURRENT_CATEGORY_SLAG(slag));
        },
        setGalleryCurrentItems: (category = 'all') => {
            dispatch(SET_GALLERY_CURRENT_ITEMS(category));
        },
        likeGalleryItem: (id) => {
            dispatch(LIKE_GALLERY_ITEM(id));
        },
        setGalleryOptionsCols: (cols) => {
            dispatch(SET_GALLERY_OPTIONS_COLS(cols));
        }
    };
};

export default connect(Reducers, Dispatches)(Gallery);