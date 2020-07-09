import React, { Component } from 'react';
import './index.less'
import { withRouter } from 'react-router-dom'
// import sun from '../../assets/images/sun.jpg'
import { formateDate } from '../../utils/dateUtils'
import MemoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/**
 * 顶上导条航的组件
 */
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),   //当前时间字符串
        dayPictureUrl: '',         //天气图片url
        weather: '',       //天气文本
    }

    /**
     * 获取时间函数
     */
    getTime = () => {
        //每隔一秒获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({ currentTime });
        }, 1000);
    }  
    /**
     * 获取天气函数
     */
    getWeather = async () => {
        //调用接口异步请求获取数据
        const { dayPictureUrl, weather } = await reqWeather('广州')
        this.setState({ dayPictureUrl, weather });

    }
    /**
     * 得到当前页面的标题
     */
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    }

    /**
     * 退出登录
     */
    logout = () => {
        Modal.confirm({
            title: '确定退出?',
            onOk: () => {
                //   console.log('OK');
                storageUtils.removeUser()
                memoryUtils.user = {};
                localStorage.clear();

                this.props.history.replace('/login');
            },
        });
    }
    /* 
    在第一次render之后执行
    一般在此执行异步操作: 发ajax请求/启动定时器
    */
    componentDidMount() {
        //获取当前的时间
        this.getTime()
        //获取当前天气
        this.getWeather()
    }

    /* 
   当前组件卸载之前调用
   */
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        const username = MemoryUtils.user.username
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <a href='hfdkhsfk' onClick={this.logout}>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt=""></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)