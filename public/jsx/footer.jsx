import React from 'react';
require('../css/footer.css');

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div>
          <a className="footerA" href="http://www.xiyou.edu.cn/" target="_blank">我的校园</a>
          <a className="footerA" href="http://lib.xupt.edu.cn/" target="_blank">图书馆</a>
        </div>

        <div id="divFooter">
          <span>本站由西安邮电大学SchoolRunner团队维护</span>
          <span>Copyright&nbsp;©&nbsp;SchoolRunner 2016</span>
        </div>
      </footer>
    )
  }
}

export default Footer;
