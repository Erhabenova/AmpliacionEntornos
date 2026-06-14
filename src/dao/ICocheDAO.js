/**
 * Interfaz DAO para la entidad Coche.
 * Define los métodos que la implementación debe ofrecer.
 */
class ICocheDAO {
  buscarPorMarca(marca) {
    throw new Error('Método buscarPorMarca() no implementado');
  }

  guardar(coche) {
    throw new Error('Método guardar() no implementado');
  }

  obtenerMaxId() {
    throw new Error('Método obtenerMaxId() no implementado');
  }
}

module.exports = ICocheDAO;
