export interface ProductCmInterface{
    id: number,
    articul: number | null,
    title: string,
    price: number | null,
    stock?: number | null,
    unit: number | null
}