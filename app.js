let   express=require("express");//引入express框架

let   cookie=require('cookie-parser');//引入cookie依赖

let   session=require('express-session')//引入session依赖

let   indexRouter=require("./router/index")//引入路由文件

let   app=express();

// 使用express托管静态资源

//app.use(express.static("./public"))
app.use(express.static(__dirname+'/public/'));


// 使用express解析常用的请求体

app.use(express.urlencoded({

    extended: false

  }))

app.use(express.json());

// 添加cookie，session依赖

app.use(cookie())

app.use(session({

  secret: 'i love iflytek',

  resave:true,

  cookie: {

      maxAge:1000*30*60    /*过期时间*/

  },

  saveUninitialized:true,

  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）

}))

 //使用路由

app.use("/",indexRouter);

// 监听地址与端口

app.listen(3001,"127.0.0.1",function(){

    console.log("127.0.0.1:3001")

})