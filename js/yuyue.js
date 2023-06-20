$(function () {
  //所有预约记录

  //页面加载完成后请求后端接口，将返回的结果遍历后，生成DOM

  $.ajax({
    url: "/getList",

    method: "get",

    success: function (ret) {
      console.log(ret);

      let html = "";

      for (let i = 0; i < ret.length; i++) {
        html +=
          `<li>` +
          ret[i].uname +
          `于` +
          ret[i].uptime +
          `完成预约,预约医院是` +
          ret[i].address +
          `</li>`;
      }

      $("#list").html(html);
    },
  });

  //当前预约信息

  $.ajax({
    url: "/getUserRecord",

    method: "get",

    success: function (ret) {
      console.log(ret);

      if (ret.length == 0) {
        $("#tip").show();

        $(".table").hide();
      } else {
        $("#tip").hide();
      }

      let html = "";

      for (let i = 0; i < ret.length; i++) {
        html +=
          `<tr>

                      <td>` +
          (i + 1) +
          `</td>

                      <td>` +
          ret[i].uname +
          `</td>

                      <td>` +
          ret[i].tel +
          `</td>

                      <td>` +
          ret[i].jztime +
          `</td>

                      <td>` +
          ret[i].address +
          `</td>

                    <td><button   class="btn btn-danger" onclick="del(` +
          ret[i].id +
          `)">删除</button></td></tr>`;
      }

      $(".table").append(html);
    },
  });
});

function del(id) {
  if (confirm("确认删除吗？")) {
    console.log(id);

    $.ajax({
      url: "/delUserRecord",

      method: "post",

      data: {
        id: id,
      },

      success: function (ret) {
        console.log(ret);

        alert(ret.msg);

        //返回code值为1001 代表操作成功，刷新当前页面

        if (ret.code == 1001) {
          location.reload();
        }
      },
    });
  }
}
