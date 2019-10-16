import React, { Component } from 'react';
import SelectBoxItem from '../SelectBoxItem/SelectBoxItem';

class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="select-box-container container">
                <h3>Подбор рецептов</h3>
                <SelectBoxItem />
                <SelectBoxItem />
                <SelectBoxItem />
                <SelectBoxItem />
                <SelectBoxItem />
                <input type="button" value="button" />
                <input type="button" value="button" />
            </div>
        );
    }
}
 
export default SelectBox;