function reg(){
    //获取用户填写的个人信息
    var   username=$("#username").val()
    var tel=$("#tel").val()
    var   password_one=$("#password_one").val();
    var   password_two=$("#password_two").val();
    var namereg=/^[\u4e00-\u9fa5]{0,}$/;
    var   telreg=/(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    // 此处验证可通过正则匹配
    if(password_one!=password_two){
        alert("2次密码输入不一致")
    }else if(namereg.test(username)   && telreg.test(tel) && password_one.length==6){//验证数据是否符合要求
        $.ajax({//使用ajax发送用户数据，进行注册验证
            url:"/register",
            method:"post",
            data:{
                username:username,
                password:password_one,
                tel:tel
            },
            success(res){
                console.log(res)
                alert(res.msg)
                if(res.code==1001){
                      location.href="./login"
                }else{
                    location.reload();
                }
            }
        })
    }else{
        alert("数据格式不合法")
    }
}

