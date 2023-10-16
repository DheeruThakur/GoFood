import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

let initialCartState = [];

const reducer = (state , action) => {
    switch(action.type){
        case "ADD" : 
            return [...state , {id:action.id , name:action.name , price:action.price , qty:action.qty , size:action.size , img:action.img}];
        case "REMOVE" : {
            let newArr = [...state];
            newArr.splice(action.index , 1)
            return newArr;
        }
        case "UPDATE" : {
            let arr = [...state];
            arr.find((food , index) => {
                if(food.id === action.id){
                    arr[index] = {...food , qty: food.qty + action.qty , price: food.price + action.price}
                }
                return arr;
            })
            return arr;
        }
        case "DROP" : {
            let empArr = [];
            return empArr;
        }
        default :
            console.log("Error in reducer");
    }
}

export const CartProvider = ({children}) => {
  const [state , dispatch] = useReducer(reducer , initialCartState);
  return (
    <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);