const CocheDAOImpl = require('../dao/impl/CocheDAOImpl');
const Coche = require('../models/Coche');

class CocheService {
  constructor(daoInstance) {
    // Permitir inyectar un DAO para pruebas (mock)
    this.dao = daoInstance || new CocheDAOImpl();
  }

  // Obtener coches por marca
  async consultarCochesPorMarca(marca) {
    if (!marca || typeof marca !== 'string' || marca.trim() === '') {
      return [];
    }
    return await this.dao.buscarPorMarca(marca.trim());
  }

  // Crear un nuevo coche
  async crearNuevoCoche(cocheData) {
    const { marca, modelo, cilindrada } = cocheData || {};

    // Validar marca
    if (!marca || typeof marca !== 'string' || marca.trim() === '') {
      const err = new Error('La marca es obligatoria');
      err.status = 400;
      throw err;
    }

    // Validar modelo
    if (!modelo || typeof modelo !== 'string' || modelo.trim() === '') {
      const err = new Error('El modelo es obligatorio');
      err.status = 400;
      throw err;
    }

    // Validar cilindrada
    if (cilindrada === undefined || cilindrada === null) {
      const err = new Error('La cilindrada es obligatoria');
      err.status = 400;
      throw err;
    }

    const cilindradaNum = Number(cilindrada);
    if (isNaN(cilindradaNum) || cilindradaNum <= 0) {
      const err = new Error('La cilindrada debe ser un valor numérico mayor que 0');
      err.status = 400;
      throw err;
    }

    // Autogenerar el identificador secuencial
    const maxId = await this.dao.obtenerMaxId();
    const nextId = maxId + 1;

    const nuevoCoche = new Coche(nextId, marca.trim(), modelo.trim(), cilindradaNum);
    
    // Guardar en la base de datos
    return await this.dao.guardar(nuevoCoche);
  }
}

// Exportamos una instancia por defecto, pero permitimos instanciar con mock para testing
module.exports = new CocheService();
module.exports.CocheService = CocheService;
