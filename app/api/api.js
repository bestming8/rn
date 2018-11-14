import CONST from "../const";
import queryString from "query-string";
import tokenstore from "../tokenstore";

exports.signup = (phoneNum, password) => {
  return fetch(CONST.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString.stringify({
      phoneNum: phoneNum,
      password: password
    })
  }).then(response => response.json());
};

exports.signin = (phoneNum, password) => {
  return fetch(CONST.signin, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString.stringify({
      phoneNum: phoneNum,
      password: password
    })
  }).then(response => response.json());
};

exports.verifycode = phoneNum => {
  return fetch(CONST.verifycode, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString.stringify({
      phoneNum: phoneNum
    })
  }).then(response => response.json());
};

exports.signinsms = (phoneNum, verifyCode) => {
  return fetch(CONST.signinsms, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString.stringify({
      phoneNum: phoneNum,
      verifyCode: verifyCode
    })
  }).then(response => response.json());
};

exports.addDevice = async (productKey, serialno) => {
  const token = await tokenstore.retrieveToken();
  console.log("addDevice Token: " + token);
  return fetch(CONST.addDevice, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    },
    body: queryString.stringify({
      productKey: productKey,
      serialno: serialno
    })
  }).then(response => response.json());
};

exports.generateTempPassword = async (productKey, serialno) => {
  const token = await tokenstore.retrieveToken();
  console.log("addDevice Token: " + token);
  return fetch(CONST.generateTempPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    },
    body: queryString.stringify({
      // productKey: productKey,
      // serialno: serialno
    })
  }).then(response => response.json());
};

exports.getDevices = async () => {
  return Promise.resolve("a");
};
