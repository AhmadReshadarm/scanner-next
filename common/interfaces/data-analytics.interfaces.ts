import { Brand, Category, Product, User } from "swagger/services";

export interface AnalyticsCategory extends Category {
    qty: number,
    amount: number,
    avgRating: number
}

export interface AnalyticsBrand extends Brand {
    qty: number,
    amount: number,
    avgRating: number
}

export interface AnalyticsProduct extends Product {
    qty: number,
    amount: number,
    avgRating: number
}

export interface AnalyticsUser extends User {
    qty: number,
    amount: number,
    avgRating: number
}

export interface DynamicData {
    date: string,
    amount: number
}