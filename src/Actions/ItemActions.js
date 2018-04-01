
import Axios from 'axios';

export function INIT_ITEM(id) {
    return {
        type: 'INIT_ITEM',
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                    params: {
                        gallery: 'item',
                        item_data: true
                    }
                }),
                Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                    params: {
                        gallery: 'item',
                        item: id
                    }
                }),
                Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                    params: {
                        gallery: 'item',
                        comments: id
                    }
                })
            ])
                .then(Axios.spread((itemData, item, comments) => {
                    resolve({
                        ...itemData.data,
                        item: item.data,
                        comments: comments.data
                    });
                }))
                .catch((error) => {
                    reject(error);
                });
        })
    }
}

export function SEEN_ITEM(id){
    return {
        type: 'SEEN_ITEM',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                params: {
                    seen_gallery_item: id
                }
            })
                .then((response) => {
                    resolve({
                        id: id,
                        seen: response.data
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function SET_ITEM_IMAGES(id){
    return {
        type: 'SET_ITEM_IMAGES',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                params: {
                    gallery: 'item',
                    images: id
                }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function SET_ITEM_SEEN(){
    return {
        type: 'SET_ITEM_SEEN',
        payload: true
    };
}

export function SET_ITEM_ID(id){
    return {
        type: 'SET_ITEM_ID',
        payload: id
    };
}

export function UNSET_ITEM(){
    return {
        type: 'UNSET_ITEM',
        payload: {
            divider: null,
            language: null,
            item: null,
            comments: null,
            images: null,
            particles: {},
            id: null
        }
    };
}

export function ADD_COMMENT(info){
    return {
        type: 'ADD_COMMENT',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                params: {
                    gallery: 'item',
                    add_comment: info.id,
                    author: info.info.author,
                    message: info.info.message
                }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function LIKE_ITEM(id){
    return {
        type: 'LIKE_ITEM',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                params: {
                    like_gallery_item: id
                }
            })
                .then((response) => {
                    resolve({
                        id: id,
                        liked: response.data
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function SET_ITEM_COMMENTS(id){
    return {
        type: 'SET_ITEM_COMMENTS',
        payload: new Promise((resolve, reject) => {

        })
    };
}
