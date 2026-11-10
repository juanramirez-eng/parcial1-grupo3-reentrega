import { useState } from "react";
import {
    BEBIDAS,
    ORIGENES,
    TAMANOS,
    type Bebida,
    type Origen,
    type Producto,
    type Tamano,
} from "../api/schemas";
import { buscarCafe, esCafe, type ProductoCafe } from "./buscarCafe";
import { formatoPrecio } from "./formatoPrecio";

const ETIQUETA_BEBIDA: Record<Bebida, string> = {
    expreso: "Expreso",
    filtrado: "Filtrado",
};

const ETIQUETA_TAMANO: Record<Tamano, string> = {
    pocillo: "Pocillo",
    mediano: "Mediano",
    "taza grande": "Taza grande",
};

const ETIQUETA_ORIGEN: Record<Origen, string> = {
    Colombia: "Colombia",
    Etiopia: "Etiopía",
    Brasil: "Brasil",
};

type Props = {
    productos: Producto[];
    onAgregar: (cafe: ProductoCafe) => void;
};

export function SelectorCafe({ productos }: Props) {
    const [bebida, setBebida] = useState<Bebida | null>(null);
    const [tamano, setTamano] = useState<Tamano | null>(null);
    const [origen, setOrigen] = useState<Origen | null>(null);

    const cafes = productos.filter(esCafe);

    function descripcionDe(origenCafe: Origen): string | undefined {
        return cafes.find((cafe) => cafe.variedad.nombre === origenCafe)?.variedad
            .descripcion;
    }

    function precioDe(origenCafe: Origen): number | undefined {
        if (bebida === null || tamano === null) return undefined;
        return buscarCafe(productos, { bebida, tamano, origen: origenCafe })?.precio;
    }

    const cafeElegido =
        bebida !== null && tamano !== null && origen !== null
            ? buscarCafe(productos, { bebida, tamano, origen })
            : undefined;

    return (
        <section aria-labelledby="titulo-cafe">
            <h2 id="titulo-cafe">Armá tu café</h2>

            <fieldset>
                <legend>1. Bebida</legend>
                {BEBIDAS.map((b) => (
                    <label key={b}>
                        <input
                            type="radio"
                            name="bebida"
                            checked={bebida === b}
                            onChange={() => setBebida(b)}
                        />
                        {ETIQUETA_BEBIDA[b]}
                    </label>
                ))}
            </fieldset>

            <fieldset>
                <legend>2. Tamaño</legend>
                {TAMANOS.map((t) => (
                    <label key={t}>
                        <input
                            type="radio"
                            name="tamano"
                            checked={tamano === t}
                            onChange={() => setTamano(t)}
                        />
                        {ETIQUETA_TAMANO[t]}
                    </label>
                ))}
            </fieldset>

            <fieldset>
                <legend>3. Origen</legend>
                {ORIGENES.map((o) => {
                    const precio = precioDe(o);
                    return (
                        <label key={o}>
                            <input
                                type="radio"
                                name="origen"
                                checked={origen === o}
                                onChange={() => setOrigen(o)}
                            />
                            <span>{ETIQUETA_ORIGEN[o]}</span>
                            <small>{descripcionDe(o)}</small>
                            {precio !== undefined && <strong>{formatoPrecio(precio)}</strong>}
                        </label>
                    );
                })}
            </fieldset>

            <button type="button" disabled={cafeElegido === undefined}>
                Agregar al carrito
            </button>
        </section>
    );
}