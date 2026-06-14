const ICocheDAO = require('../ICocheDAO');
const pool = require('../../gestores/gestorDB');
const Coche = require('../../models/Coche');

class CocheDAOImpl extends ICocheDAO {
  
  // Buscar coches por marca
  async buscarPorMarca(marca) {
    const [rows] = await pool.query(
      'SELECT identificador, marca, modelo, cilindrada FROM T_COCHE WHERE marca = ?',
      [marca]
    );
    return rows.map(r => new Coche(r.identificador, r.marca, r.modelo, r.cilindrada));
  }

  // Guardar un nuevo coche
  async guardar(coche) {
    await pool.query(
      'INSERT INTO T_COCHE (identificador, marca, modelo, cilindrada) VALUES (?, ?, ?, ?)',
      [coche.identificador, coche.marca, coche.modelo, coche.cilindrada]
    );
    return coche;
  }

  // Obtener el ID máximo actual para poder autoincrementar manualmente
  async obtenerMaxId() {
    const [rows] = await pool.query('SELECT MAX(identificador) AS maxId FROM T_COCHE');
    return rows[0].maxId || 0;
  }
}

module.exports = CocheDAOImpl;
