import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';

import Producto from './pages/producto/Producto';
import CrearProducto from './pages/producto/CrearProducto';
import ModificarProducto from './pages/producto/ModificarProducto';

class Routes extends Component {

    render(){
        return (
            <Switch>
                <Route path="/producto" exact component={Producto} />
                <Route path="/producto/crear" exact component={CrearProducto} />
                <Route path="/producto/modificar/:id" exact component={ModificarProducto} />
            </Switch>
        );
    }
}

export default Routes;