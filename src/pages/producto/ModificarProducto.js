import React, {
    Component
} from 'react';
import {
    Formik,
    Form,
    Field
} from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

import SweetAlert from 'sweetalert-react';

import CategoriasSelect from './../../componets/CategoriasSelect';

import { URL, TOKEN } from './../../config/config';

const ProductoSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    precio: Yup.string()
        .required('Required'),
    categoria_id: Yup.string()
        .required('Required'),
    cantidad: Yup.string()
        .required('Required'),
});

class ModificarProducto extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            producto : null
        }
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/producto/${id}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
           let r = respuesta.data;
           this.setState({
               producto : r.data
           });
        }).catch(error=>{
            alert("Error");
        });
    }

    modificar(value){
        axios({
            method: 'put',
            url: `${URL}/producto/${this.state.producto.id}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }, 
            data : value
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                    sweetShow: true,
                    sweetText: datos.mensaje,
                    sweetTitle: "Hola",
                    sweetType: "success"
                });
                
            }else{
                this.setState({
                    sweetShow: true,
                    sweetText: datos.error,
                    sweetTitle: "Hola",
                    sweetType: "error"
                });
            }
        });
    }

    formulario(){
        return (<Formik
            initialValues={this.state.producto}
            validationSchema={ProductoSchema}
            onSubmit={value=>{
                this.modificar(value);
            }}
        >
        {({ errors, touched, values }) => (
            <Form>
                <h1>Modificar producto</h1>
                <div className="row">
                    <div className="col-6 form-group ">
                        <label>Nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                            <div className="text-danger">{errors.nombre}</div>
                        ) : null}
                    </div>
                    <div className="col-6 form-group">
                        <label>Precio</label>
                        <Field name="precio" className="form-control" />
                        {errors.precio && touched.precio ? (
                            <div className="text-danger">{errors.precio}</div>
                        ) : null}
                    </div>
                    <div className="col-6 form-group">  
                        <label>Categorias</label> 
                        <CategoriasSelect categoria_id={this.state.producto.categoria_id} />              
                        {errors.categoria_id && values.categoria_id == "" ? (
                            <div className="text-danger">{errors.categoria_id}</div>
                        ) : null}
                    </div>
                    <div className="col-6 form-group">  
                        <label>Cantidad</label>                
                        <Field name="cantidad" className="form-control" />
                        {errors.cantidad && touched.cantidad ? (
                            <div className="text-danger">{errors.cantidad}</div>
                        ) : null}
                    </div>
                    <br />
                    <br />
                    <div className="col-12">
                        <button type="submit" className="btn btn-warning float-right">Modificar</button>
                    </div>
                </div>
            </Form>
        )}
        </Formik>);
    }

    render() {
        return (
            <div> 
                {
                    this.state.producto != null ? this.formulario() : ''
                }
                <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/producto');
                    }}
                />
            </div>
        );
    }
}

export default ModificarProducto;