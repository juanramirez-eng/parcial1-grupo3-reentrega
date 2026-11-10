import { useState, useEffect, useCallback } from "react";
import { fetchProductos } from "../services/apiClient";
import type { Producto } from "../schemas/producto.schema";

export type EstadoMenu =
    | { estado: "cargando" }
    | { estado: "error"; mensaje: string }
    | { estado: "listo"; productos: Producto[] };

export function useMenu() {
    const [estado, setEstado] = useState<EstadoMenu>({ estado: "cargando" });

    const cargarMenu = useCallback(async () => {
        setEstado({ estado: "cargando" });
        try {
            const productos = await fetchProductos();
            setEstado({ estado: "listo", productos });
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : "Error desconocido";
            setEstado({ estado: "error", mensaje });
        }
    }, []);

    useEffect(() => {
        void cargarMenu();
    }, [cargarMenu]);

    return { estado, reintentar: cargarMenu };
}