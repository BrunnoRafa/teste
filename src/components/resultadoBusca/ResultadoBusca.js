import React, { Component } from 'react'

import uuidv4 from 'uuid/v4';

import InfoVeiculos from './components/InfoVeiculos';
import DetalheCarro from './components/DetalheCarro';

import './resultadoBusca.scss';

class ResultadoBusca extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMostraForm: false,
            cars: []
        }

        this.handleClickAbrirForm = this.handleClickAbrirForm.bind(this);
    }

    handleClickAbrirForm(infoCarro, isForm) {
        let data = isForm ? infoCarro : this.props.cars;
        this.setState({
            isMostraForm: isForm,
            data: data
        })
    }

    render () {
        return (
            <div>
                { !this.state.isMostraForm ?
                        this.props.cars.map(carro => {
                            return (Object.keys(carro).length > 1) ?  
                                        <InfoVeiculos key={uuidv4()} 
                                            click={this.handleClickAbrirForm.bind(this)} 
                                            dadosCarro={carro} /> : '';
                        })
                    : 
                        <DetalheCarro data={this.state.data} clickCancelar={this.handleClickAbrirForm.bind(this)} />
                }
            </div>
        )
    }
}

export default ResultadoBusca;