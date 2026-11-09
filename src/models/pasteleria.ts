export class Pasteleria {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly precioBase: number,
    ) { }

    calcularPrecio(): number {
        return this.precioBase;
    }
}