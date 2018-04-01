
import Axios from 'axios';

export function INIT_ABOUT(){
    return {
        type: 'INIT_ABOUT',
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get('http://cheerier-trailer.000webhostapp.com/art/art.php', {
                    params: {
                        about: 'about'
                    }
                })
            ])
                .then(Axios.spread((about) => {
                    resolve({
                        ...about.data
                    });
                }))
                .catch((error) => {
                    reject(error);
                });
        })
    };
}