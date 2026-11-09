export abstract class Producto {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly precioBase: number,
    ) { }

    abstract calcularPrecio(): number;
}