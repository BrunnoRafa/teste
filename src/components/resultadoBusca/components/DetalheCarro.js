import React, { Component } from 'react';

// import CurrencyFormatter from 'react-currency-formatter';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import serialize from 'form-serialize';

import Botao from '../../Botao';

class DetalheCarro extends Component {
    formRef

    constructor(props) {
        super(props);

        this.state = {
            brands: [],
            mensagem: '',
            title: '',
            model: '',
            year: '',
            brand: '',
            color: '',
            price: '',
            km: '',
            id: null,
            novoCadastro: false
        }

        axios.get('http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/brands')
            .then(res => {
                this.setState({
                    brands: res.data.brands
                })
            })
            .catch(error => {
                console.log(error);
            });

        this.formRef = React.createRef();

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeKm = this.handleChangeKm.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleClickCancelar = this.handleClickCancelar.bind(this);
        this.handleClickRemover = this.handleClickRemover.bind(this);
        this.handleClickSalvar = this.handleClickSalvar.bind(this);
    }

    componentDidMount() {
        let novo = typeof this.props.novoCadastro !== undefined ? this.props.novoCadastro : false;

        if(typeof this.props.data !== 'undefined'){
            this.setState({
                title: this.props.data.title || '',
                model: this.props.data.model || '',
                year: this.props.data.year || '',
                brand: this.props.data.brand || '',
                color: this.props.data.color || '',
                price: this.props.data.price || null,
                km: this.props.data.km || null,
                id: this.props.data.id || null,
                novoCadastro: novo
            })        
        } else {
            this.setState({
                novoCadastro: novo
            })
        }
    }
    
    handleChangeTitle(elemento) {
        this.setState({
            title: elemento.value
        });
    }

    handleChangeModel(elemento) {
        this.setState({
            model: elemento.value
        });
    }

    handleChangeYear(elemento) {
        this.setState({
            year: elemento.value
        });
    }

    handleChangeColor(elemento) {
        this.setState({
            color: elemento.value
        });
    }

    handleChangePrice(elemento) {
        this.setState({
            price: elemento.value
        });
    }

    handleChangeKm(elemento) {
        this.setState({
            km: elemento.value
        });
    }

    handleChangeSelect(e) {
        this.setState({
            brand: e.target.value
        })
    }

    handleClickRemover(e, id) {
        axios.delete(`http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/cars/${id}`)
            .then(res => {
                if (res.status === 200) {
                    msg = res.statusText
                } else {
                    msg = res.statusText
                }
            }).catch(err => {
                console.log(err);
                msg = 'error';
            })

        this.exibirMensagem(msg);
    }

    handleClickCancelar(e) {
        if (typeof this.props.clickCancelar === "function")
            this.props.clickCancelar([], false)
    }

    handleClickCreate(e) {
        let msg = '';
        let car = serialize(this.formRef.current, { hash: true, empty: true});
        
        axios.post(`http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/cars`, {car})
            .then((res) => {
                if (res.status === 200) {
                    msg = res.statusText
                    this.handleClickCancelar(e);
                } else {
                    msg = res.statusText
                }
            }).catch(err => {
                console.log(err);
                msg = 'error';
            })

        this.exibirMensagem(msg);
    }

    handleClickSalvar(e, id) {
        let msg = '';
        let car = serialize(this.formRef.current, { hash: true, empty: true});
        car.id = id;
        
        axios.put(`http://private-amnesiac-f46a73-tradersclubapi.apiary-proxy.com/api/cars/${id}`, {car})
            .then((res) => {
                if (res.status === 200) {
                    msg = res.statusText
                } else {
                    msg = res.statusText
                }
            }).catch(err => {
                console.log(err);
                msg = 'error';
            })

        this.exibirMensagem(msg);
    }

    exibirMensagem(msg) {
        this.setState({
            mensagem: msg
        }, () => {
            setTimeout(() => {
                this.setState({
                    mensagem: ''
                });
            }, 4000);
        });
    }

    render() {
        return(
            <div className="DetalheCarro">
                <div className="caixaMensagem">
                    {this.state.mensagem !== '' ? <span className="mensagem">{this.state.mensagem}</span> : ''}
                </div>
                <form ref={this.formRef} className="formularioDetalhe" >
                    <input type='text' name='title' placeholder="title" value={this.state.title} className='input inputTitulo' onChange={(e) => this.handleChangeTitle(e)} />
                    <input type='text' name='model' placeholder="model" value={this.state.model} className='input inputModelo' onChange={(e) => this.handleChangeModel(e)} />
                    <input type='text' name='year' placeholder="year" value={this.state.year} className='input inputAno' onChange={(e) => this.handleChangeYear(e)} />
                    <select name="brand" value={this.state.brand} onChange={(e) => this.handleChangeSelect(e)} className="selectMarcaFabricante">
                        <option>Selecione</option>
                        {this.state.brands.map((option) => {
                            return <option key={uuidv4()} className="optionsMarca" value={option.name}>{option.name}</option>;
                        })}
                    </select>
                    <input type='text' name='color' placeholder="color" value={this.state.color} className='input inputCor' onChange={(e) => this.handleChangeColor(e)} />
                    <input type='text' name='price' placeholder="price" value={this.state.price} className='input inputPreco' onChange={(e) => this.handleChangePrice(e)} />
                    <input type='text' name='km' placeholder="km" value={this.state.km} className='input inputKm' onChange={(e) => this.handleChangeKm(e)} />
                    <div className="caixaBotoes">
                        <Botao
                            desabilitado={this.state.novoCadastro} 
                            classe='botaoRemover'
                            nome='botaoRemover' 
                            valor='Remover'
                            click={(e) => this.handleClickRemover(e, this.state.id)}
                        />
                        <Botao 
                            classe='botaoCancelar'
                            nome='botaoCancelar' 
                            valor='Cancelar' 
                            click={this.handleClickCancelar}
                        />
                        {
                            this.state.novoCadastro ?
                                <Botao
                                    classeContainer='containerBotaoSalvar'
                                    classe='botaoSalvar' 
                                    nome='botaoSalvar' 
                                    valor='Salvar' 
                                    click={(e) => this.handleClickCreate(e)}
                                    />
                            :
                                <Botao
                                    classeContainer='containerBotaoSalvar'
                                    classe='botaoSalvar' 
                                    nome='botaoSalvar' 
                                    valor='Salvar' 
                                    click={(e) => this.handleClickSalvar(e, this.state.id)}
                                />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default DetalheCarro;