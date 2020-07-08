const menuList = [
    {
        title:'首页',  //菜单标题名称
        key:"/home",  //对应的Path
        icon:"weibo"   //图标名称
    },
    {
        title:'商品',
        key:'/products',
        icon:'car',
        children:[
            {
                title:'品类管理',
                key:"/category",
                icon:'appstore'
            }, {
                title:'商品管理',
                key:"/product",
                icon:'wechat'
            }
        ]
    },
    {
        title:'用户管理',
        key:"/user",
        icon:'user'
    },
    {
        title:'角色管理',
        key:"/role",
        icon:'pie-chart'
    },
    {
        title:'图形图表',
        key:"/charts",
        icon:'tool',
        children:[
            {
                title:'pie',
                key:"/charts/pie",
                icon:'bars'
            }, {
                title:'line',
                key:"/charts/line",
                icon:'tool'
            }, {
                title:'bar',
                key:"/charts/bar",
                icon:'tool'
            }
        ]
    }

]

export default menuList