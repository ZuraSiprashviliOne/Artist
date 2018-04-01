
import Axios from 'axios';

export function SET_NAVIGATION(){
    return {
        type: 'SET_NAVIGATION',
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get('http://localhost/art/art.php', {
                    params: {
                        navigation: 'nav'
                    }
                }),
                Axios.get('http://localhost/art/art.php', {
                    params: {
                        navigation: 'list'
                    }
                })
            ])
                .then(Axios.spread((nav, list) => {
                    resolve({
                        ...nav.data,
                        list: list.data
                    });
                }))
                .catch((error) => {
                    reject(error);
                });
        })
    };
}

export function SET_NAVIGATION_SIDEBAR(val){
    return {
        type: 'SET_NAVIGATION_SIDEBAR',
        payload: val
    };
}

export function SET_NAVIGATION_CURRENT_PAGE(slag){
    return {
        type: 'SET_NAVIGATION_CURRENT_PAGE',
        payload: slag
    };
}

export function SET_NAVIGATION_WIDE(b){
    return {
        type: 'SET_NAVIGATION_WIDE',
        payload: b
    };
}