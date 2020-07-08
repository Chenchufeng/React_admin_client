import React, { Component } from 'react';
import { Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/Thunder.jpg'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
/**
 * 左侧导航的组件
 */
class LeftNav extends Component {
    /**
     * 根据menu的数据数组生成对应的标签数组
     * 使用map+递归调用
     */
    getMenuNodes_map = (menuList) => {
         //得到当前请求的路由路径
        const path=this.props.location.pathname
        return menuList.map((item) => {
            /**
             * title:'首页',  //菜单标题名称
                key:"/home",  //对应的Path
                icon:'home'   //图标名称
                children: [] , //可能有，也可能没有
             */
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            else {
                //查找一个与当前请求路径匹配的子Item
                const cItem=item.children.find(cItem=>cItem.key===path)
                //如果存在，说明当前的Item列表需要打开
                if(cItem){
                    this.openKey=item.key
                }
                

                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })

    }
    /**
     * 在第一次render之前执行一次
     * 为第一次render渲染准备数据(必须同步的)
     */
    UNSAFE_componentWillMount(){
        this.menuNodes=this.getMenuNodes_map(menuList)
    }
    render() {
        //得到当前请求的路由路径
        const path=this.props.location.pathname
        console.log('render()',path)
        //得到需要打开菜单项的key
        const openkey=this.openKey
        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-header'>
                    <img src={logo} alt="logo"></img>
                    <h1>雷霆后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openkey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}
/**
 * withRouter高阶组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history/match/location
 */
export default withRouter(LeftNav)
