import React from 'react';
import './Header.css';

import Search from '../../img/search.png';
import Logo from '../../img/logo.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <header>
        <div className="row">
          <img className="logo" src={Logo} alt=""/>
          <form className="header__search col-xl-4 col-lg-4 col-md-5 col-sm-6 col-7">
            <input className="search" type="search" name="headerSearch" />
            {/* <input type="submit" value="search" /> */}
            <button className="header-search">
              <img src={Search}/>
            </button>
          </form>
          <div className="header__login">
            <a href="/login">
              {/*//////////////////////  просто картинка входа ///////////////////////////////////*/}
              <div className="lock">
                <div className="key-hole"></div>
              </div>
              {/*////////////////////////////////////////////////////////////////////////////////*/}
            </a>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;