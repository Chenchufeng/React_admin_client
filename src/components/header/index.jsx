import React, { Component } from 'react';
import './index.less'
import sun from '../../assets/images/sun.jpg'
/**
 * 顶上导条航的组件
 */
export default class Header extends Component {
    render() {
        return (
            <div className='header'> 
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <a href='hfdkhsfk'>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2020-7-8 17:48:32</span>
                        <img src={sun} alt=""></img>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}
