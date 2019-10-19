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
            <div className="line container-fluid no-gutter">
                <div className="row">
                    <hr className="hr-logo no-gutter" />
                    <img src={Spica} alt="qwe" />
                </div>
            </div>
        );
    }
}
 
export default CustomHR;