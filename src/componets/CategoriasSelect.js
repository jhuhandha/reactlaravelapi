import React, {Component} from 'react';
import axios from 'axios';
import {
    Field
} from 'formik';

import {URL, TOKEN} from './../config/config';

class CategoriasSelect extends Component{

    constructor(props){
        super(props);
        this.state = {
            categorias : []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/categorias/select`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                    categorias : datos.data
                });
            }else{
                console.log("no");
            }
        });
    }

    listar(){
        if(this.state.categorias.length > 0){
            let id = this.props.categoria_id;

            return this.state.categorias.map((e, i)=>
                <option value={id} key={i} value={e.id}> {e.nombre} </option>
            );

        }
    }

    render(){
        return (
            <Field component="select" name="categoria_id" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
}

export default CategoriasSelect;