import React from 'react';
import './Header.css';

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
            <label for="headerSearch">
              <img src="#" />
            </label>
            <input type="search" name="headerSearch" />
            <input type="submit" value="search" />
          </form>
          <div className="header__login col-xl-4 offset-xl-4">
            <a href="#">
              <img src="#" />
            </a>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;