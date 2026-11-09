export abstract class Producto {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly precioBase: number,
    ) {
        if (precioBase < 0) {
            throw new Error("El precioBase no puede ser negativo");
        }
    }

    abstract calcularPrecio(): number;
}