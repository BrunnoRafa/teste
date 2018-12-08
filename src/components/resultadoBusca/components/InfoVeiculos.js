import React, { Component } from 'react';

import CurrencyFormatter from 'react-currency-formatter';

class InfoVeiculos extends Component {

    handleClickAbrirCadastro(e, data) {
        if (typeof this.props.click === 'function')
            this.props.click(data, true);
    }

    render () {
        let dados = this.props.dadosCarro;
        return (
            <div className="caixaInfoCarro" onClick={(e) => this.handleClickAbrirCadastro(e, dados)}>
                <div className="tituloCarroValor">
                    <span className="tituloCarro">{dados.title}</span>
                    <span className="valorCarro">
                        <CurrencyFormatter 
                            quantity={+dados.price}
                            currency="R$ "
                            locale="pt_BR" 
                            decimal=","
                        />
                    </span>
                </div>
                <div className="dadosCarro">
                    <span className="dadosModelo">
                        <ul className="listaInfoCarro">
                            {(dados.model !== null) ? <li className="modeloCarro">{dados.model}</li> : ''}
                            {(dados.brand !== null) ? <li className="marcaCarro">{dados.brand}</li> : ''}
                            {(dados.km !== null) ? 
                                <li className="kmCarro">
                                    <CurrencyFormatter 
                                        quantity={+dados.km}
                                        currency=" KM"
                                        locale="pt_BR"
                                        pattern="##,### !" 
                                        grupo="."
                                    />
                                </li> 
                            : 
                                ''
                            }
                        </ul>
                    </span>
                    <span className="anoCarro">{dados.year}</span>
                </div>
            </div>
        )
    }
}

export default InfoVeiculos;