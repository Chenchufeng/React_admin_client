/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 * 优化：统一处理请求异常？
 *  在外层包一个自己创建的Promise对象
 * 在请求出出错时，不reject（error），而是显示错误提示
 */
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){

    return new Promise((resolve,reject)=>{
        let promise
        //1.执行异步ajax请求
        if(type==='GET'){   //发get请求
            promise=axios.get(url,{  //配置对象
                params:data   //指定请求参数
            })
        }else{   //发post请求
            promise= axios.post(url,data)
        }
        //2.如果成功了，调用resolve(value)
        promise.then(response=>{
            resolve(response.data)
        //3.如果失败了，不调用reject(reason)，而是提示异常信息
        }).catch(error=>{
            message.error('请求出错了'+error.message)
        })       

        

        
    })
   
}



//请求登录接口
// ajax('/login',{username:'admin',password:'123456'},'POST').then()