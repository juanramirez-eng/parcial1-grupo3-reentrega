import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Limpieza automática del DOM después de cada prueba (traído de main)
afterEach(() => {
    cleanup();
});

// Polyfill de Map.groupBy para compatibilidad con MSW 2 / Vitest 3
if (!("groupBy" in Map)) {
    // @ts-expect-error polyfill para entornos sin soporte nativo de Map.groupBy
    Map.groupBy = <K, T>(items: Iterable<T>, callback: (item: T, index: number) => K): Map<K, T[]> => {
        const map = new Map<K, T[]>();
        let i = 0;
        for (const item of items) {
            const key = callback(item, i++);
            const group = map.get(key);
            if (!group) {
                map.set(key, [item]);
            } else {
                group.push(item);
            }
        }
        return map;
    };
}

// Polyfill de Object.groupBy
if (!("groupBy" in Object)) {
    // @ts-expect-error polyfill para Object.groupBy
    Object.groupBy = <K extends PropertyKey, T>(items: Iterable<T>, callback: (item: T, index: number) => K): Partial<Record<K, T[]>> => {
        const obj = Object.create(null);
        let i = 0;
        for (const item of items) {
            const key = callback(item, i++);
            if (key in obj) {
                obj[key].push(item);
            } else {
                obj[key] = [item];
            }
        }
        return obj;
    };
}