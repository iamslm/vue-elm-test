import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


export const getUser = () => {
    return fetch('/v1/user', {user_id: getStore('user_id')});
};

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});


// 获取短信验证码
export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms',
}, 'POST');

//检测账号是否存在
export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});

//手机号登录
export var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
	code,
	mobile,
	validate_token
}, 'POST');

//获取图片验证码
export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');

//账号密码登录
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');
