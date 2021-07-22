export interface ProductsInterface{
    id: number,
    title: string,
    articul: string,
    price: number,
    parent: number,
    visible?: number,

    children?: ProductsInterface[]
}