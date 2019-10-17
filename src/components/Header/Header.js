import React from 'react';
import './Header.css';

import Search from '../../img/search.png';
import UserProfile from '../../img/UserProfile.png';
import Logo from '../../img/logo.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <header className="container-fluid">
        <div className="row">
          <img className="logo" src={Logo} alt=""/>
          <form className="header__search col-xl-3">
            <input className="search" type="search" name="headerSearch" />
            {/* <input type="submit" value="search" /> */}
            <button className="header-search">
              <img src={Search}/>
            </button>
          </form>
          <div className="header__login col-xl-4 offset-xl-4">
            <a href="#">
              <img src={UserProfile} />
            </a>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;