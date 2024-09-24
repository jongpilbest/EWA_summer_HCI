
import { createSlice  } from '@reduxjs/toolkit';
import { act } from 'react';

export const counterSlice = createSlice({
    name: 'imageembed',
    initialState:{imageemb:[]
        ,textemb:[],
        idem:[],
    },
    reducers: {
        image_embed: (state,action) => { state.imageemb = action.payload; },
        text_embed: (state,action) => { state.textemb = action.payload; },
        id_embed:(state,action)=>{state.idem= [...state.idem,action.payload]}

    }
})

export const { image_embed,text_embed } = counterSlice.actions;

export default counterSlice.reducer;