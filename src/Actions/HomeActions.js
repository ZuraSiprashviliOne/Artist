
import Axios from 'axios';

export function SET_HOME_HEADER(){
    return {
        type: 'SET_HOME_HEADER',
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get('http://localhost/art/art.php', {
                    params : {
                        home: 'header'
                    }
                }),
                Axios.get('http://localhost/art/art.php', {
                    params: {
                        particles: true
                    }
                })
            ])
            .then(Axios.spread((header, particles) => {
                resolve({
                    ...header.data,
                    particles: particles.data
                });
            }))
            .catch((error) => {
                reject(error);
            });
        })
    };
}