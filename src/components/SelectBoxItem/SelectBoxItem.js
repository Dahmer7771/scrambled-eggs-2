import React, { Component } from 'react';

class SelectBoxItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <select className="select-box-item">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
            </select>
        );
    }
}
 
export default SelectBoxItem;