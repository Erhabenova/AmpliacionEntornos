// models/Coche.js
class Coche {
  constructor(identificador, marca, modelo, cilindrada) {
    this.identificador = identificador;
    this.marca = marca;
    this.modelo = modelo;
    this.cilindrada = cilindrada;
  }

  toString() {
    return `Coche [identificador=${this.identificador}, marca=${this.marca}, modelo=${this.modelo}, cilindrada=${this.cilindrada}]`;
  }
}

module.exports = Coche;
