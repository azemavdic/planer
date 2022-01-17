import { createSlice } from '@reduxjs/toolkit'

export const editingItemSlice = createSlice({
  name: 'edit',
  initialState: {
    value: false,
  },
  reducers: {
    isEditing: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { isEditing } = editingItemSlice.actions
export default editingItemSlice.reducer
