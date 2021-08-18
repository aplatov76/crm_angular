export interface ClientInterface{
    id: number,
    fullname: string,
    passport_number?: string,
    passport_data?: Date,
    passport_release?: string,
    phone: string,
    residence_address?: string,
    description: string
}