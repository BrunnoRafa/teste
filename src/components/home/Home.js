import React, { Component } from 'react';

import './home.scss';

class Home extends Component {
    render() {
        return (
            <div className="caixaImagemBanner">
                <img src="assets/img/car-wireframe.png" className="imgCarro" />
                <h2 className="banner">Pesquisa de Veículos do <span className="spanTradersClub">TradersClub</span></h2>
            </div>
        );
    }
}

export default Home;