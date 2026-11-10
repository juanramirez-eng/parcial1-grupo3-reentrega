import { Producto } from "./producto";

export class Pasteleria extends Producto {
    readonly tipo = "pasteleria" as const;

    calcularPrecio(): number {
        return this.precioBase;
    }
}