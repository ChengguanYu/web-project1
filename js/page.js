function jump() {
  //跳转至预约详情

  location.href = "./yuyue.html";
}

function dateInit() {
  var date = new Date();

  var year = date.getFullYear();

  var month = date.getMonth() + 1;

  var day = date.getDate();

  month = month > 9 ? month : "0" + month;

  day = day > 9 ? day : "0" + day;

  var mindate = year + "-" + month + "-" + day;

  $("#time").val(mindate);

  $("#time").attr({ min: mindate });

  console.log(mindate);
}

function selectInit() {
  $.ajax({
    url: "/getHospitalSelect",

    success(ret) {
      console.log(ret);

      let html = "";

      for (let i = 0; i < ret.length; i++) {
        html +=
          `<option   value="` +
          ret[i].hospital +
          `">` +
          ret[i].hospital +
          `</option>`;
      }

      $("#address").html(html);
    },
  });
}

selectInit(); //初始化下拉接种医院

dateInit(); //设置日期表单的最小值为当天

function send() {
  //获取用户预约数据

  var uname = $("#uname").val();

  var tel = $("#tel").val();

  var time = $("#time").val();

  var address = $("#address").val();

  var namereg = /^[\u4e00-\u9fa5]{0,}$/;

  var telreg =
    /(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

  if (
    namereg.test(uname) &&
    telreg.test(tel) &&
    time.length > 0 &&
    address.length > 0
  ) {
    //验证用户数据数据是否符合要求

    $.ajax({
      //使用ajax发送用户数据，进行预约

      url: "/yuyue",

      method: "post",

      data: {
        uname: uname,

        tel: tel,

        time: time,

        address: address,
      },

      success(ret) {
        console.log(ret);

        alert(ret.msg);
      },
    });

    $("#myModal").modal("hide"); //关闭模态框
  } else {
    alert("输入信息格式有误，请检查");

    $("#myModal").modal("hide"); //关闭模态框
  }
}
