import React, { Component } from 'react';
import Spica from '../../img/spica.jpg';

class CustomHR extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="container">
                <hr className="col-xl-12" />
                <img src={Spica} alt="qwe" />
            </div>
        );
    }
}
 
export default CustomHR;