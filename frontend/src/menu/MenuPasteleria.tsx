import type { Producto } from "../api/schemas";
import { formatoPrecio } from "./formatoPrecio";

export type ProductoPasteleria = Extract<Producto, { tipo: "pasteleria" }>;

type Props = {
    productos: Producto[];
    onAgregar: (producto: ProductoPasteleria) => void;
};

export function MenuPasteleria({ productos, onAgregar }: Props) {
    const pasteleria = productos.filter(
        (p): p is ProductoPasteleria => p.tipo === "pasteleria",
    );

    return (
        <section aria-labelledby="titulo-pasteleria">
            <h2 id="titulo-pasteleria">Pastelería</h2>
            <ul>
                {pasteleria.map((p) => (
                    <li key={p.id}>
                        <span>{p.nombre}</span>
                        <strong>{formatoPrecio(p.precio)}</strong>
                        <button
                            type="button"
                            aria-label={`Agregar ${p.nombre}`}
                            onClick={() => onAgregar(p)}
                        >
                            Agregar
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}