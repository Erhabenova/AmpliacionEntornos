const { CocheService } = require('../src/services/CocheService');
const Coche = require('../src/models/Coche');

describe('Pruebas Unitarias de CocheService', () => {
  let mockDao;
  let service;

  beforeEach(() => {
    // Inicializar mock del DAO incluyendo el nuevo método buscarTodos
    mockDao = {
      buscarPorMarca: jest.fn(),
      buscarTodos: jest.fn(), // <--- ¡Añadido!
      guardar: jest.fn(),
      obtenerMaxId: jest.fn()
    };
    // Instanciar el servicio inyectando el mock del DAO
    service = new CocheService(mockDao);
  });

  describe('Método: consultarCochesPorMarca(marca)', () => {
    test('1. Marca existente ("Seat") -> Debería retornar una lista con exactamente 3 coches', async () => {
      const cochesMock = [
        new Coche(2, 'Seat', 'León', 1600),
        new Coche(4, 'Seat', 'Clio', 1400),
        new Coche(5, 'Seat', 'Ibiza', 1400)
      ];
      mockDao.buscarPorMarca.mockResolvedValue(cochesMock);

      const resultados = await service.consultarCochesPorMarca('Seat');

      expect(mockDao.buscarPorMarca).toHaveBeenCalledWith('Seat');
      expect(mockDao.buscarTodos).not.toHaveBeenCalled();
      expect(resultados).toHaveLength(3);
      expect(resultados[0].marca).toBe('Seat');
    });

    test('2. Marca inexistente ("Ferrari") -> Debería retornar una lista vacía', async () => {
      mockDao.buscarPorMarca.mockResolvedValue([]);

      const resultados = await service.consultarCochesPorMarca('Ferrari');

      expect(mockDao.buscarPorMarca).toHaveBeenCalledWith('Ferrari');
      expect(mockDao.buscarTodos).not.toHaveBeenCalled();
      expect(resultados).toEqual([]);
    });

    test('3. Entrada vacía o nula -> Debería llamar a buscarTodos() en el DAO y retornar la lista global', async () => {
      const todosLosCochesMock = [
        new Coche(1, 'Renault', 'Megane', 1500),
        new Coche(2, 'Seat', 'León', 1600)
      ];
      // Configuramos el mock para cuando se llame a buscarTodos
      mockDao.buscarTodos.mockResolvedValue(todosLosCochesMock);

      const resultNull = await service.consultarCochesPorMarca(null);
      const resultEmpty = await service.consultarCochesPorMarca('');

      // Comprobamos que NO se usa buscarPorMarca, sino buscarTodos
      expect(mockDao.buscarPorMarca).not.toHaveBeenCalled();
      expect(mockDao.buscarTodos).toHaveBeenCalledTimes(2);

      expect(resultNull).toEqual(todosLosCochesMock);
      expect(resultEmpty).toEqual(todosLosCochesMock);
    });
  });

  describe('Método: crearNuevoCoche(cocheData)', () => {
    test('1. Cilindrada nula -> Debería lanzar error de validación (400)', async () => {
      const cocheInvalido = {
        marca: 'Volkswagen',
        modelo: 'Golf',
        cilindrada: null
      };

      await expect(service.crearNuevoCoche(cocheInvalido)).rejects.toThrow(
        expect.objectContaining({ status: 400 })
      );
      expect(mockDao.guardar).not.toHaveBeenCalled();
    });

    test('2. Cilindrada <= 0 (0) -> Debería lanzar error de validación (400)', async () => {
      const cocheInvalido = {
        marca: 'Volkswagen',
        modelo: 'Golf',
        cilindrada: 0
      };

      await expect(service.crearNuevoCoche(cocheInvalido)).rejects.toThrow(
        expect.objectContaining({ status: 400 })
      );
      expect(mockDao.guardar).not.toHaveBeenCalled();
    });

    test('2b. Cilindrada <= 0 (-1200) -> Debería lanzar error de validación (400)', async () => {
      const cocheInvalido = {
        marca: 'Volkswagen',
        modelo: 'Golf',
        cilindrada: -1200
      };

      await expect(service.crearNuevoCoche(cocheInvalido)).rejects.toThrow(
        expect.objectContaining({ status: 400 })
      );
      expect(mockDao.guardar).not.toHaveBeenCalled();
    });

    test('2c. Campos de texto obligatorios vacíos -> Debería lanzar error de validación (400)', async () => {
      const cocheSinMarca = {
        marca: '',
        modelo: 'Golf',
        cilindrada: 2000
      };

      const cocheSinModelo = {
        marca: 'Volkswagen',
        modelo: null,
        cilindrada: 2000
      };

      await expect(service.crearNuevoCoche(cocheSinMarca)).rejects.toThrow(
        expect.objectContaining({ status: 400 })
      );
      await expect(service.crearNuevoCoche(cocheSinModelo)).rejects.toThrow(
        expect.objectContaining({ status: 400 })
      );
      expect(mockDao.guardar).not.toHaveBeenCalled();
    });

    test('3. Datos válidos -> Debería persistir el coche con el siguiente ID y retornar el objeto coche creado (201)', async () => {
      const cocheValido = {
        marca: 'Volkswagen',
        modelo: 'Golf',
        cilindrada: 2000
      };

      mockDao.obtenerMaxId.mockResolvedValue(7);
      mockDao.guardar.mockImplementation((coche) => Promise.resolve(coche));

      const cocheCreado = await service.crearNuevoCoche(cocheValido);

      expect(mockDao.obtenerMaxId).toHaveBeenCalled();
      expect(mockDao.guardar).toHaveBeenCalled();
      expect(cocheCreado.identificador).toBe(8); // 7 + 1
      expect(cocheCreado.marca).toBe('Volkswagen');
      expect(cocheCreado.modelo).toBe('Golf');
      expect(cocheCreado.cilindrada).toBe(2000);
    });
  });
});