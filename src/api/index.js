/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值是promise
 * 
 * 
 */
import ajax from './ajax'


//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }

//登陆（lambda表达式写法）
export const reqLogin=(username,password)=> ajax('/login',{username,password},'POST')




//----------------写法2
/**
 *  export const reqLogin2=(username,password)=>{
    var parmas = new URLSearchParams();
    parmas.append('username',username)
    parmas.append('password',)
     return ajax('/login',parmas,'POST')
    }

 */



