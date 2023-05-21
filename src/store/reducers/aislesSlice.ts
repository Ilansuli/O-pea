import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AisleObj } from '../../types/aisle'
import { aisleService } from '../../services/aisle.service'
export interface AislesState {
    aisles: AisleObj[]
}

const initialState: AislesState = {
    aisles: []
}

export const aislesSlice = createSlice({
    name: 'aisles',
    initialState,
    reducers: {
        loadAisles: state => {
            state.aisles = aisleService.getAisles()
        }
    }
})

export const { loadAisles } = aislesSlice.actions

export const selectAisles = (state: RootState) => state.aisles.aisles

export default aislesSlice.reducer