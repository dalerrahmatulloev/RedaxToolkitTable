import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'counter',
    initialState: {
        data: [
            {
                name:"Daler",
                age: 14,
                id:1,
                status: false
            },
            {
                name:"Usuf",
                age: 41,
                id:2,
                status: false
            },
            {
                name:"Mamud",
                age: 12,
                id:3,
                status: false
            }
        ],
        idx : null,
        name: '',
        age: '',
        search: '',
        filAge: '',
        filStatus: ''
    },
    reducers: {
        addUser: (state, action)=>{
            state.data.push(action.payload);
        },
        delUser: (state, action)=>{
            state.data = state.data.filter((el)=> el.id != action.payload);
        },
        check: (state, action)=>{
            state.data.forEach(element => {
                if(element.id == action.payload){
                    element.status =!element.status;
                }
            });
        },
        editUser: (state, action)=>{
            state.data.forEach((element) => {
                if(element.id == action.payload.id){
                    element.name = action.payload.name;
                    element.age = action.payload.age;
                }
            })
        },
        setIdx: (state, action) => {
            state.idx = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAge: (state, action) => {
            state.age = action.payload;
        },
        setSearch: (state, action)=> {
            state.search = action.payload;
        },
        set: (state, action) => {
            if(action.payload.name == "filAge"){
                state.filAge = action.payload.value;
            }
            if(action.payload.name == "filStatus"){
                state.filStatus = action.payload.value;
            }
        }
    }
})

export const {addUser, delUser, check, editUser, setSearch, set, setIdx, setName, setAge } = todoSlice.actions
export default todoSlice.reducer