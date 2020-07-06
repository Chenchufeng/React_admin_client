day01总结
## 1. 项目开发准备
    1). 描述项目
    2). 技术选型
    3). API接口/接口文档/测试接口

## 2. 启动项目的开发
    1). 启用React脚手架创建项目
    2). 开发环境运行 npm start/yarn start（在内存中对项目进行打包，启动服务器运行，不会再本地生成打包文件）
    3). 生产环境打包运行：npm run build  server

## 3. git管理项目
    1). 创建远程仓库
    2). 创建本地仓库
        a. 配置.gitignore
        b. git init
        c. git add .
        d. git commit -m '描述'
    3). 将本地仓库推送到远程仓库
        git remote add origin url
        git push origin master
    4). 在本地创建dev分支，并推送到远程
        git checkout -b dev
        git push origin dev
    5). 如果本地有修改
        git add .
        git commit -m '描述'
        git push origin dev
    6). 新的同事：克隆仓库
        git clone url
        git checkout -b dev origin/dev
        git pull origin dev
    7). 如果远程修改
        git pull origin pull

## 4. 创建项目的基本结构
    api: ajax的请求模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js

## 5. 引入antd
    下载antd的包
    按需打包：只打包import引入组件的js/css
        下载工具包
        引入antd：yarn add antd（注意版本）我的版本：yarn add antd@3.26.16
        yarn add react-app-rewired customize-cra babel-plugin-import

        /* package.json */
        "scripts": {
        -   "start": "react-scripts start",
        +   "start": "react-app-rewired start",
        -   "build": "react-scripts build",
        +   "build": "react-app-rewired build",
        -   "test": "react-scripts test",
        +   "test": "react-app-rewired test",
        }
        
        config-override.js
        package.json
    自定义主题
        下载工具包:  yarn add less less-loader(less-loader版本5.0.0)
        config-override.js
    使用antd组件
        根据antd文档编写
        antd官网：https://3x.ant.design/components/form-cn/#components-form-demo-inline-login

## 6. 引入路由
    下载包：react-router-dom
    拆分应用路由
        Login:登录
        Admin:后台管理界面
    注册路由：
        <BrowserRouter>
        <Switch>
        <Route path='' component={} />

## 7. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登录表单界面（antd的Form组件 ）

    