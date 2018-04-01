
import React from 'react';
import { connect } from 'react-redux';

import {Loading} from '../../Components/Loading';
import { SET_NAVIGATION_CURRENT_PAGE } from '../../Actions/NavigationAction';
import { SET_ITEM_ITEM, INIT_ITEM, SET_ITEM_ID, SEEN_ITEM, SET_ITEM_SEEN, SET_ITEM_IMAGES, UNSET_ITEM, LIKE_ITEM, ADD_COMMENT } from '../../Actions/ItemActions';
import { checkPromise } from '../../Helpers/Valid';
import { getPageSlag } from '../../Helpers/Routing';
import { Link } from 'react-router-dom';

import Particles from 'react-particles-js';

import '../../Stylesheets/item.css';

import Translate from '../Translate';
import { SET_GALLERY } from '../../Actions/GalleryActions';

import FontAwesome from 'react-fontawesome';

import Swiper from 'react-id-swiper';

class ItemSidebar extends React.Component{
    constructor(props){
        super(props);
        this.getGalleryCategories = () => {
            let listItems = this.props.categories.map((category) => {
                return (
                    <li
                        className={`listItem animated ${this.props.itemCategories.find((cat) => cat.id === category.id) ? 'active flipInX': ''}`}
                        key={category.id}>
                        <Link
                            to={`/pages/gallery_page/${category.slag}`}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                {category.title}
                            </Translate>
                        </Link>
                    </li>
                );
            });
            return (
                <ul
                    className={'list categoriesList'}>
                    {listItems}
                </ul>
            )
        };
    }

    render(){
        return (
            <div 
                id={'itemSidebar'}>
                {this.getGalleryCategories()}
            </div>
        )
    }
}

class Images extends React.Component{
    constructor(props){
        super(props);

        this.swiperParams = () => {
            return {
                pagination: {
                  el: '.swiper-pagination',
                  type: 'progressbar',
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                renderCustomPrevButton: () => (
                    <button className={'swiper-button-prev'}>
                        <FontAwesome
                            name={'angle-left'} />
                    </button>
                ),
                renderCustomNextButton: () => (
                    <button className={'swiper-button-next'}>
                        <FontAwesome
                            name={'angle-right'} />
                    </button>
                ),
                spaceBetween: 30,
                effect: 'fade',
                loop: true
            };
        };

        this.getImages = () => {
            let images = this.props.images.map((image) => {
                return (
                    <div
                        style={{backgroundImage: `url(${image.image})`}}
                        key={image.image}>
                        {/* <img src={image.image} /> */}
                    </div>
                );
            });

            return [
                (
                    <div
                        style={{backgroundImage: `url(${this.props.image})`}}
                        key={'primImage'}>
                        {/* <img src={this.props.image} /> */}
                    </div>
                ),
                ...images
            ];
        };

        this.love = this.love.bind(this);
    }

    
    love(event){
        if(!this.props.liked){
            this.props.like(this.props.id);
        }
    }

    render(){
        return (
            <div
                className={'images'}>
                <Swiper
                    {...this.swiperParams()}>
                    {this.getImages()}
                </Swiper>
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
        );
    }
}

class Infos extends React.Component{
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

        this.getDate = this.getDate.bind(this);
    }

    getDate(dateString){
        let date = new Date(dateString);

        let resDate = [date.getDay(), date.getMonth(), date.getFullYear()];

        return resDate.join('/');
    }

    render(){
        return (
            <div className={'info'}>
                {this.props.title ? (
                    <div
                        className={'title'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            {this.props.title}
                        </Translate>
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
                    <div className={'description'}>
                        {this.props.full_description ? (
                            <div 
                                dangerouslySetInnerHTML={{__html: this.props.full_description}}
                                className={'desc-text'} />
                        ): this.props.short_description ? (
                            <div
                                dangerouslySetInnerHTML={{__html: this.props.short_description}}
                                className={'desc-text'}/>
                        ): null}
                    </div>
                    {this.props.categories.length > 0 ?(
                        <div
                            className={'item_categories'}>
                            {this.getCategories()}
                        </div>
                    ) : null}
                    <div className={'metas'}>
                        <div className={'metaItems'}>
                            <div className={'meta w-icon'}>
                                <FontAwesome
                                        name={'comment'}/>
                                <span>
                                    <Translate
                                        from={this.props.language}
                                        divider={' '}>
                                        {this.props.comments + ' comments'}
                                    </Translate>
                                </span>
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
                        {/* <div className={'readMore'}>
                            <Link
                                to={`/pages/gallery_item/${this.props.id}`}>
                                <Translate
                                    from={this.props.language}
                                    divider={this.props.divider}>
                                    read more
                                </Translate>
                            </Link>
                        </div> */}
                    </div>
                </div>
        );
    }
}

class Comment extends React.Component{
    constructor(props){
        super(props);

        this.getDate = this.getDate.bind(this);
    }

    getDate(dateString){
        let date = new Date(dateString);

        let resDate = [date.getDay(), date.getMonth(), date.getFullYear()];

        return resDate.join('/');
    }

    render(){
        return (
            <div className={'comment animated fadeIn'}>
                <div className={'title'}>
                    <div className={'author'}>
                        {this.props.nickname}
                    </div>
                    <div className={'metas'}>
                        <div className={'meta w-icon'}>
                            <FontAwesome
                                name={'calendar'}/>
                            <span>
                                {this.getDate(this.props.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={'message_text'}>
                    <div>
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}

class Comments extends React.Component{
    constructor(props){
        super(props);

        this.getComments = () => {
            let comments = this.props.comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />;
            });
            
            if(comments.length === 0){
                return (
                    <div className={'noComments'}>
                        <Translate
                            from={this.props.language}
                            divider={this.props.divider}>
                            no comments yet, be first !
                        </Translate>
                    </div>
                );
            }

            return comments;
        };
    }

    render(){
        return (
            <div
                className={'commentsBlock animated fadeIn'}>
                <div className={'title'}>
                    <Translate
                        from={this.props.language}
                        divider={this.props.divider}>
                        recent comments
                    </Translate>
                </div>
                <div className={'blockofComments'}>
                    {this.getComments()}
                </div>
            </div>
        );
    }
}

class Commenter extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(event){
        event.preventDefault();

        this.props.addComment(this.props.id, {author: this.nickName.value, message: this.message.value});
        this.nickName.value = this.message.value = '';
    }

    render(){
        return (
            <div className={'animated fadeIn commenterBlock'}>
                <div className={'title'}>
                    <Translate
                        from={this.props.language}
                        divider={this.props.divider}>
                        add comment
                    </Translate>
                </div>
                <form className={'comment_adder'} onSubmit={this.submit}>
                    <div className={'nickname'}>
                        <div className={'label'}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                nickname
                            </Translate>
                        </div>
                        <div className={'input'}>
                            <input 
                                type={'text'}
                                ref={(element) => {
                                    this.nickName = element;
                                }}
                                placeholder={'Nick Name'}/>
                        </div>
                    </div>
                    <div className={'message'}>
                        <div className={'label'}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                message
                            </Translate>
                        </div>
                        <div className={'input'}>
                            <textarea
                                placeholder={'Message'}
                                ref={(element) => {
                                    this.message = element;
                                }}/>
                        </div>
                    </div>
                    <div className={'buttons'}>
                        <button
                            type={'reset'}
                            ref={(element) => {
                                this.reset = element;
                            }}
                            className={'btn-reset'}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                reset
                            </Translate>
                        </button>
                        <button
                            ref={(element) => {
                                this.send = element
                            }}
                            type={'submit'}
                            className={'btn-send'}>
                            <Translate
                                from={this.props.language}
                                divider={this.props.divider}>
                                send
                            </Translate>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

class ItemData extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div 
                className={'animated fadeIn'}
                id={'itemData'}>
                <div 
                    className={'data'}>
                    <Images
                        id={this.props.item.id}
                        like={this.props.like}
                        liked={this.props.item.liked}
                        images={this.props.images}
                        image={this.props.item.image}/>
                    <Infos
                        {...this.props.item}/>
                </div>
                <Commenter 
                    divider={this.props.divider}
                    language={this.props.language}
                    addComment={this.props.addComment}
                    id={this.props.item.id}/>
                <Comments
                    divider={this.props.divider}
                    language={this.props.language}
                    comments={this.props.item.comms}/>
            </div>
        );
    }
}

class Element extends React.Component{
    constructor(props){
        super(props);

        this.props.seenItem(this.props.match.params.itemId);
    }

    render(){
        return (
            <main
                className={'page animated fadeIn'}
                id={'item'}>
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}
                    params={{
                        ...this.props.Item.particles,
                        particles: {
                            ...this.props.Item.particles.particles,
                            number: {
                                value: window.screen.width / 30
                            }
                        }
                    }}/>
                <div
                    id={'itemContent'}>
                    <ItemData 
                        divider={this.props.Item.divider}
                        language={this.props.Item.language}
                        like={this.props.likeGalleryItem}
                        item={this.props.Item.item}
                        images={this.props.Item.images}
                        addComment={this.props.addComment}/>
                    <ItemSidebar 
                        divider={this.props.Item.divider}
                        language={this.props.Item.language}
                        categories={this.props.Gallery.categories}
                        itemCategories={this.props.Item.item.categories} />
                </div>
            </main>
        );
    }
}

class Item extends React.Component{
    constructor(props){
        super(props);

        // this.state = {
        //     ready: () => (
        //         checkPromise(this.props.Item)
        //         && this.props.Gallery.categories !== null
        //     )
        // };

        this.init = this.init.bind(this);
    }

    componentWillMount(){
        this.init(this.props);
    }

    componentWillUnmount(){
        this.props.unsetItem();
    }

    componentWillReceiveProps(props){
        this.init(props);
    }

    init(props){
        if(checkPromise(this.props.Item) === false){
            if(this.props.Gallery.categories === null){
                this.props.setGallery();
            }

            const id = parseInt(props.match.params.itemId);
            if(this.props.Item.id !== id){
                this.props.setPage(getPageSlag(props.match.path));
                this.props.initItem(id);
                this.props.setItemId(id);
                this.props.setImages(id);
            }
        }
    }

    render(){
        if(checkPromise(this.props.Item)
        && this.props.Gallery.categories !== null){
            return <Element {...this.props} />;
        }else{
            return <Loading />;
        }
    }
}

const Reducers = (state) => {
    return {
        Item: state.ItemReducer,
        Gallery: state.GalleryReducer
    };
};
const Dispatches = (dispatch) => {
    return {
        setPage: (slag) => {
            dispatch(SET_NAVIGATION_CURRENT_PAGE(slag === 'gallery_item' ? 'gallery_page': slag));
        },
        initItem: (id) => {
            dispatch(INIT_ITEM(id));
        },
        unsetItem: () => {
            dispatch(UNSET_ITEM());
        },
        setItemId: (id) => {
            dispatch(SET_ITEM_ID(id));
        },
        setGallery: () => {
            dispatch(SET_GALLERY());
        },
        seenItem: (id) => {
            dispatch(SEEN_ITEM(id));
        },
        setImages: (id) => {
            dispatch(SET_ITEM_IMAGES(id));
        },
        likeGalleryItem: (id) => {
            dispatch(LIKE_ITEM(id));
        },
        addComment: (id, info) => {
            dispatch(ADD_COMMENT({id: id, info: info}));
        }
    };
};

export default connect(Reducers, Dispatches)(Item);