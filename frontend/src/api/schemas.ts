import { z } from 'zod'

export const BEBIDAS = ['expreso', 'filtrado'] as const
export const TAMANOS = ['pocillo', 'mediano', 'taza grande'] as const
export const ORIGENES = ['Colombia', 'Etiopia', 'Brasil'] as const

export type Bebida = (typeof BEBIDAS)[number]
export type Tamano = (typeof TAMANOS)[number]
export type Origen = (typeof ORIGENES)[number]

const cafeBase = z.object({
    id: z.string(),
    nombre: z.string(),
    tamano: z.enum(TAMANOS),
    variedad: z.object({
        nombre: z.enum(ORIGENES),
        descripcion: z.string(),
    }),
    precio: z.number(),
})

export const productoSchema = z.discriminatedUnion('tipo', [
    cafeBase.extend({ tipo: z.literal('expreso') }),
    cafeBase.extend({ tipo: z.literal('filtrado') }),
    z.object({
        id: z.string(),
        tipo: z.literal('pasteleria'),
        nombre: z.string(),
        precio: z.number(),
    }),
])

export const productosSchema = z.array(productoSchema)

export type Producto = z.infer<typeof productoSchema>