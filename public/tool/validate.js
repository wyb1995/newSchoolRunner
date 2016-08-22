function checkTel(tel) {
  const correctTel = tel.length === 11;
  const reg = new RegExp('^[0-9]*$');
  return reg.test(tel) && correctTel;
}

function checkMail(email) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return filter.test(email);
}

module.exports = {checkTel, checkMail};
