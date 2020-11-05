import {
    GET_USERINFO
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

export default {
    [GET_USERINFO](state,n) {
        state.userInfo += n;
    }
}