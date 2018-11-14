exports.checkPhone = (phone) => { 
  if (!phone)
    return false

  if(!(/^1[34578]\d{9}$/.test(phone))){ 
      return false; 
  }

  return true
}

exports.checkPassword = (password) => { 
  if (!password)
    return false

  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
  return reg.test(password);
}
  

exports.checkVerifyCode = (code) => { 
  if (!code)
    return false

  const reg = /\d{6}/
  return reg.test(code);
}
  