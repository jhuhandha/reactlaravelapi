import React, {Component} from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';

import {URL, TOKEN} from './../../config/config'

class Producto extends Component {

    constructor(props){
        super(props);
        this.state = {
            productos : [],
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    llamar_listar(){
        axios({
            method: 'get',
            url: `${URL}/producto`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
           let r = respuesta.data;
           this.setState({
               productos : r.data
           });
        }).catch(error=>{
            alert("Error");
        });
    }

    cambiar_estado(id){
        axios({
            method: 'delete',
            url: `${URL}/producto/${id}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
           let r = respuesta.data;
           if(r.ok){
                this.setState({
                    sweetShow: true,
                    sweetText: r.mensaje,
                    sweetTitle: "Hola",
                    sweetType: "success"
                });
                this.llamar_listar();
           }
        }).catch(error=>{
            alert("Error");
        });
    }

    editar(id){
        this.props.history.push(`/producto/modificar/${id}`);
    }

    componentDidMount(){
        this.llamar_listar();
    }

    boton_estado(clase, texto, id){
        return (<button onClick={()=>{
            this.cambiar_estado(id);
        }} className={clase}>{texto}</button>)
    }

    listar(){
        if(this.state.productos.length > 0){
            return this.state.productos.map(
                (e, i) => 
                <tr key={i}>
                    <td>{e.nombre}</td>
                    <td>{e.precio}</td>
                    <td>{e.cantidad}</td>
                    <td>{e.nombre_categoria}</td>
                    <td>{e.estado == 1 ? 'Activo': 'Inactivo'}</td>
                    <td>
                        {
                            e.estado == 1 ?
                            this.boton_estado("btn btn-danger", "Inactivar", e.id)
                            :
                            this.boton_estado("btn btn-success", "Activar", e.id)
                        }
                        <button onClick={()=>this.editar(e.id)} className="btn btn-primary">Editar</button>
                    </td>
                </tr>
            );
        }
    }

    cargando(){
        return (<tr>
            <td colSpan="6" className="text-center">
                <img src="/ajax-loader.gif" />
            </td>
        </tr>);
    }

    render(){
        return (
            <div>
                <h1>Productos</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Categoria</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.listar()==null?this.cargando():this.listar()}
                    </tbody>
                </table>
                <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => this.setState({ sweetShow: false })}
                />
            </div>
        );
    }
}

export default Producto;