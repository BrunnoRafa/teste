// Importação de Módulos 
import React, {Component} from "react";

import axios from 'axios';

import Home from './components/home/Home';
import Botao from './components/Botao';
import ResultadoBusca from './components/resultadoBusca/ResultadoBusca';
import DetalheCarro from './components/resultadoBusca/components/DetalheCarro';

import '../assets/styles/Shared.scss';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            textoPesquisa: '',
            novoCadastro: false,
            cars: []
        }

        axios.get('http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/')
            .then(res => {
                if(res.status === 200) {
                    console.log('Api online ', res.data.online);
                } else {
                    console.log('Api Offline');
                }
            })
            .catch(error => {
                console.log(error);
            });

        this.handleChangePesquisa = this.handleChangePesquisa.bind(this);
        this.handleClickCadastrar = this.handleClickCadastrar.bind(this);
        this.handleClickFecharForm = this.handleClickFecharForm.bind(this)
    }

    handleChangePesquisa(e) {
        this.setState({
            textoPesquisa: e.target.value
        }, () => {
            this.getCarros(this.state.textoPesquisa)
        })
    }

    getCarros(valor){
        axios.get(`http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/cars?search=${valor}`)
            .then(res => {
                this.setState({
                    cars: res.data.cars
                })
            }, error => {
                console.error(error);
            });
    }

    handleClickCadastrar(e) {
        if(this.state.cars.length < 1){
            this.setState({
                novoCadastro: true
            });
        }
    }

    handleClickFecharForm() {
        this.setState({
            novoCadastro: false
        })
    }

    render() {
        return (
            <div className="caixaApp">
                <div className="menu">
                    <h1>TradersClub</h1>
                </div>
                <div className="caixaConteudo">
                    <div className="caixaInputPesquisa">
                        <input type="text" 
                            name="Pesquisa" 
                            className="input inputPesquisa" 
                            placeholder="Pesquise por um veículo"
                            value={this.state.textoPesquisa} 
                            onChange={this.handleChangePesquisa} />
                        <Botao 
                            nome={'botaoCadastrar'} 
                            valor={'Cadastrar'} 
                            click={this.handleClickCadastrar}
                            />
                    </div>
                    <div className="caixaSecao">
                        {
                            this.state.textoPesquisa === '' ?
                                <Home />
                            : 
                                this.state.novoCadastro ?
                                    <DetalheCarro novoCadastro={true} clickCancelar={this.handleClickFecharForm} />
                                :
                                <ResultadoBusca cars={this.state.cars} textoPesquisa={this.state.textoPesquisa} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
