import React, { Component } from "react";

class CreatedRecipe extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Название рецепта</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Категория</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Фото</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Описание</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
                    </div>
                    <label htmlFor="">Шаг</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                               -
                            </button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-secondary btn-sm">Small button</button>
                </form>
            </div>
        );
    }
}

export default CreatedRecipe;
