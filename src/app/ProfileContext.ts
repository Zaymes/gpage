'use client'
import { createContext, useContext, Dispatch, SetStateAction } from 'react'

type WardContextType = {
    ward: string;
    setWard: Dispatch<SetStateAction<string>>;
} | null

export const WardContext = createContext<WardContextType>(null)

export function useWard() {
    const context = useContext(WardContext)
    if (!context) {
        throw new Error('useWard must be used within a WardProvider')
    }
    return context
}