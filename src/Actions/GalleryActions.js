
import Axios from 'axios';

export function SET_GALLERY(){
    return {
        type: 'SET_GALLERY',
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get('http://localhost/art/art.php', {
                    params: {
                        gallery: 'gallery'
                    }
                }),
                Axios.get('http://localhost/art/art.php', {
                    params: {
                        gallery: 'categories'
                    }
                })
            ])
                .then(Axios.spread((gallery, categories) => {
                    resolve({
                        ...gallery.data,
                        categories: categories.data
                    });
                }))
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function SET_GALLERY_CURRENT_ITEMS(category){
    return {
        type: 'SET_GALLERY_CURRENT_ITEMS',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://localhost/art/art.php', {
                params: {
                    gallery: 'items',
                    category: category
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

export function SET_GALLERY_CURRENT_CATEGORY_SLAG(slag){
    return {
        type: 'SET_GALLERY_CURRENT_CATEGORY_SLAG',
        payload: slag
    };
}

export function SET_GALLERY_OPTIONS_COLS(count){
    return {
        type: 'SET_GALLERY_OPTIONS_COLS',
        payload: count
    };
}

export function LIKE_GALLERY_ITEM(id){
    return {
        type: 'LIKE_GALLERY_ITEM',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://localhost/art/art.php', {
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