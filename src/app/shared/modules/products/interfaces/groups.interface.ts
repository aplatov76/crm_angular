export interface GroupsInterface{
    id: number,
    title: string
    parent?: number
    children?: GroupsInterface[]
}