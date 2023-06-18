function submit(){
    var   username=$("#username").val();//获取用户名
    var   password=$("#password").val();//获取密码
    if(username.length>0 &&   password.length>0){//判断用户名密码是否填写
        $.ajax({//使用ajax发送用户数据，进行登陆验证
            url:"/login",
            method:"post",
            data:{
                username:username,
                password:password
            },
            success(res){
                console.log(res)
                alert(res.msg)
                if(res.code==1001){
                      location.href="/index.html"
                }else{
                    location.reload();
                }
            }
        })
    }else{
        alert("账号密码必填")//给出用户提示
    }
}