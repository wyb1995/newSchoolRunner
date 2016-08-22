function checkTel(tel) {
<<<<<<< 56b3f5d0001b23b91424679038e978e0e84f7ae0
  let correctTel = tel.length === 11;
  let reg = new RegExp("^[0-9]*$");
=======
  const correctTel = tel.length === 11;
  const reg = new RegExp('^[0-9]*$');
>>>>>>> eslint and cookie and jasmine
  return reg.test(tel) && correctTel;
}

function checkMail(email) {
<<<<<<< 56b3f5d0001b23b91424679038e978e0e84f7ae0
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
=======
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
>>>>>>> eslint and cookie and jasmine
  return filter.test(email);
}

module.exports = {checkTel, checkMail};
