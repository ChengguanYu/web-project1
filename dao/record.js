let dbutil = require("../dbutil/dbutil");

const moment = require('moment');

function addRecord(infoarr, callback) {
  //添加预约信息

  let sql =
    "INSERT INTO xg_record (uid,uname, tel, jztime, address, uptime) VALUES (?,?, ?, ?, ?,?)";

  dbutil.query(sql, infoarr, function (err, ret) {
    if (err) {
      console.log("error====" + err);

      return;
    }

    if (ret.affectedRows == 1) {
      callback(1);
    } else {
      callback(-1);
    }
  });
}

function getHospitalSelect(callback) {
  //获取接种医院信息

  let sql = "select * from   xg_hospital";

  dbutil.query(sql, function (err, ret) {
    if (err) {
      console.log("error====" + err);
      return;
    }
    callback(ret);
  });
}

function getRecord(callback) {
  //获取所有预约接种记录
  let sql = "select uname,uptime,address   from xg_record order by uptime desc";

  dbutil.query(sql, function (err, ret) {
    if (err) {
      console.log("error====" + err);
      return;
    }
    var packet=[]
    for(index=0 ; index<ret.length;index++)
    {
        var temp = {
            uname: ret[index].uname,
            uptime: moment(ret[index].uptime).format('YYYY:MM:DD:HH:mm:ss'),
            address: ret[index].address
        }
        packet.push(temp);
    }
    callback(packet);
  });
}

function getUserRecord(uid, callback) {
  //获取当前用户预约接种记录

  let sql = "select * from xg_record   where uid=" + uid;
  console.log(uid);
  dbutil.query(sql, function (err, ret) {
    if (err) {
      console.log("error====" + err);
      return;
    }
    var packet=[]
    for(index=0 ; index<ret.length;index++)
    {
        var temp = {
            id:ret[index].id,
            uid:ret[index].uid,
            Uname:ret[index].Uname,
            tel:ret[index].tel,
            jztime:moment(ret[index].jztime).format('YYYY:MM:DD'),
            Address:ret[index].Address,
            Uptime:ret[index].Uptime
        }
        packet.push(temp);
    }
    callback(packet);
  });
}

function delUserRecord(id, callback) {
  //删除指定预约信息

  let sql = "DELETE FROM xg_record where   id=" + id;

  dbutil.query(sql, function (err, ret) {
    if (err) {
      console.log("error====" + err);

      return;
    }

    // 根据影响的行数判断是否操作成功，给通过callback返回1或者-1

    if (ret.affectedRows == 1) {
      callback(1);
    } else {
      callback(-1);
    }
  });
}

module.exports = {
  addRecord,

  getRecord,

  getUserRecord,

  delUserRecord,

  getHospitalSelect,
};
