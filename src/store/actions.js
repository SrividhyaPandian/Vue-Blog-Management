// Actions where the API calls and other manipulations can be made before updating the state via mutations.

import axios from 'axios';

export default {
    getAPIData({ commit }, payload){

        var apiURL = payload.apiURL;
        var mutationURL = payload.mutationURL;

        axios.get(apiURL).then((response)=> {
            if(response) {
                payload.response = response.data;
                commit(mutationURL, payload);
            }
        })
    }
}