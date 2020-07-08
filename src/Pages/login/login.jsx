import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.jpg'
import { Form, Icon, Input, Button,message} from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
/* 
登录的路由组件
*/
class Login extends Component {

    handleSubmit=(event)=>{
        //阻止事件的默认行为
        event.preventDefault()
        //对所有的表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            //校验成功
            if (!err) {
              console.log('提交登录的ajax请求', values);
              //请求登录
            //   reqLogin()      //回退功能：alt + <-
              const {username,password}=values
              const result=await reqLogin(username,password)
              console.log('请求成功',result)
            //   const result=response.data  //{status:0 data:user}  {status:1 msg:'xxx'}
              if(result.status===0){   //登录成功
                message.success('登录成功')
                //保存user
                const user=result.data
                memoryUtils.user=user  //保存在内存中
                storageUtils.saveUser(user)  //保存在local中
                //跳转到后台管理界面
                this.props.history.replace('/admin')
              }else{    //登录失败
                message.error(result.msg) 
              }
            }
            else{
                console.log('校验失败')
            }
          });
        // //得到form对象
        // const form=this.props.form
        // //获取表单项的输入数据
        // const values=form.getFieldsValue()
        // console.log('handleSubmit()',values)
    }

    /**
     * 对密码进行自定义验证
     * /**
        * 用户名/密码的合法性要求
         * 1.必须输入
         * 2.必须大于等于4位
         * 3.必须小于等于12位
         * 4.必须是英文，数字，下划线组成
         
     */
    validatePwd=(rule, value, callback)=>{
        console.log('validdatePwd',rule,value)
        if(!value){
            callback('密码必须输入')
        }
        else if(value.length<4){
            callback('密码长度不能小于4')
        }else if(value.length>12){
            callback('密码长度不能大于12')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字，下划线组成')
        }else{
            callback() //验证通过
        }
        
    }
    render() {
        //如果用户已经登陆，自动跳转到管理界面
        const user=memoryUtils.user
        if(user && user._id){
            return <Redirect to='/admin' />
        }



        //得到具有强大功能的form对象
        const form=this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>项目: 后台管理系统</h1>
                </header>
                
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">    {/* 提交表单调用handleSubmit */}
                        <Form.Item>
                        {/**
                         * 用户名/密码的合法性要求
                         * 1.必须输入
                         * 2.必须大于4位
                         * 3.必须小于12位
                         * 4.必须是英文，数字，下划线组成
                         */}
                        {
                           getFieldDecorator('username',{
                            //声明式验证：直接使用别人定义好的验证规则进行验证
                            rules: [
                                { required: true, message: 'Please input your username!' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字，下划线组成' }
                            ],
                           })
                           (
                                <Input       
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                /> 
                           )
                        }
                        
                        </Form.Item>

                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {
                                            validator:this.validatePwd
                                        }
                                    ],
                                    // initialValue:'admin' //指定初始值
                                })
                                (
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        </Form.Item>
                     </Form>
                </section>
            </div>
        )
    }
}
/**
 * 1.高阶函数
 *      一类特别的函数
 *      a.
 * 2.高阶组件
 * 
 * 
 */
// export default Login
/**
 * 包装一个组件生成一个新的组件:Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */
const WrapLogin=Form.create()(Login)
export default WrapLogin
/*
1.前台表单验证
2.收集表单输入数据
*/
