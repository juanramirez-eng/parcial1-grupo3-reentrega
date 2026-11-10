import { describe, it, expect } from "vitest";
import { Expreso } from "../src/models/expreso";
import { Filtrado } from "../src/models/filtrado";
import { Pasteleria } from "../src/models/pasteleria";

describe("tipo de producto", () => {
    it("un Expreso es de tipo expreso", () => {
        expect(new Expreso("1", "mediano", "Colombia").tipo).toBe("expreso");
    });

    it("un Filtrado es de tipo filtrado", () => {
        expect(new Filtrado("1", "mediano", "Colombia").tipo).toBe("filtrado");
    });

    it("una Pasteleria es de tipo pasteleria", () => {
        expect(new Pasteleria("1", "Muffin de chocolate", 2500).tipo).toBe("pasteleria");
    });
});