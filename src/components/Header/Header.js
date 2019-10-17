import React from 'react';
import './Header.css';

import Search from '../../img/search.png';
import UserProfile from '../../img/UserProfile.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <header className="container">
        <div className="row">
          <form className="header__search col-xl-4">
            <button className="header-search">
              <img src={Search}/>
            </button>
            <input className="search" type="search" name="headerSearch" />
            {/* <input type="submit" value="search" /> */}
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