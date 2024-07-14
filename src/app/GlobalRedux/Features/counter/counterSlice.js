
import { createSlice  } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'imageembed',
    initialState:{imageemb:[]

        ,textemb:[]
    },
    reducers: {
        image_embed: (state,action) => { state.imageemb = action.payload; },
        text_embed: (state,action) => { state.textemb = action.payload; },
    }
})

export const { image_embed,text_embed } = counterSlice.actions;

export default counterSlice.reducer;