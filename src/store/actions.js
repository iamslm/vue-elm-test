import {
    getUser,
} from '../service/getData'
import {
    GET_USERINFO,
} from './mutation-types.js'

export default {
    getUserInfo({
        commit,
        state
    }) {
        setTimeout(() => {
            commit(GET_USERINFO, 20);
        }, 1000)
        
    }
}