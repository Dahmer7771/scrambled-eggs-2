import React, { Component } from "react";
import EditorConvertToHTML from "../editor-convert-to-html/editor-convert-to-html";

class ChangeRecipeClient extends Component {
    render() {
        return (
            <div className="container">
                <form className="created_recipe">
                    asdfasdf
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Название рецепта:</label>
                        <input type="text" name="name" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Категория</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="category">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Фото</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <EditorConvertToHTML />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ChangeRecipeClient;
