function studentrent(borrowlist, readerType) {
  let rent = 0;//借书数
  let all;//可借书数
  let ctime;//可借书时长
  let outnum = 0;//超时书数
  switch (readerType) {
    case '本科生':
      all = 15;
      ctime = 30;
      break;
    case '研究生':
      all = 20;
      ctime = 45;
      break;
    case '老师':
      all = 30;
      ctime = 60;
      break;
    default :
      all = 15;
      ctime = 30;
  }
  if (borrowlist == 'NO_RECORD' || borrowlist == null || borrowlist == '' || borrowlist == undefined) {
    rent = 0;
  }
  else {

    rent = borrowlist.length;
    let Dates = borrowlist;
    let oDate = new Date();
    for (let i = 0; i < rent; i++) {
      let d1 = new Date(Date.parse(Dates[i].Date));
      if (oDate > d1) {
        outnum++;
      }
    }
  }
  let borrowedInfo = {borrowedCount: rent, remainedCount: all - rent, allCount: all, outCount: outnum};
  return borrowedInfo;
}
export default studentrent;
