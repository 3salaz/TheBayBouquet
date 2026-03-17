export type CustomOrderFormData = {
    occasion: string
    pickupDate: string
    pickupTime: string
    flowerTypes: string
    flowerColors: string[]
    wrappingStyle: string
    quantity: string
    lettering: string
    notes: string
    budget: string
    customerName: string
    customerPhone: string
    customerEmail: string
}

export const initialCustomOrderFormData: CustomOrderFormData = {
    occasion: "",
    pickupDate: "",
    pickupTime: "",
    flowerTypes: "",
    flowerColors: [],
    wrappingStyle: "",
    quantity: "",
    lettering: "",
    notes: "",
    budget: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
}