import React, { Component } from 'react';
import './Custom.css';

import Spica from '../../img/spica.jpg';

class CustomHR extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="line container">
                <hr className="col-xl-10" />
                <img src={Spica} alt="qwe" />
            </div>
        );
    }
}
 
export default CustomHR;