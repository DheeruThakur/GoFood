import React , {useEffect, useRef, useState} from 'react'
import { useCart , useDispatchCart } from './ContextReducer';

function Card(props) {
    const options = props.options;
    const priceOptions = Object.keys(options);

    const dispatch = useDispatchCart();
    let data = useCart();

    const [qty , setQty] = useState(1);
    const [size , setSize] = useState();

    let priceRef = useRef();

    let finalPrice = qty * options[size];

    const cartHandler = async () => {
        let food = [];
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type:"UPDATE" , id:props.foodItem._id , price:finalPrice , qty:qty})
                return
            }
            else if(food.size !== size){
                await dispatch({type:"ADD" , id:props.foodItem._id , name:props.foodItem.name , price:finalPrice , qty:qty , size:size})
                return
            }
            return
        }
        await dispatch({type:"ADD" , id:props.foodItem._id , name:props.foodItem.name , price:finalPrice , qty:qty , size:size })
        // console.log(data);
    }

    useEffect(() => {
        setSize(priceRef.current.value)
    } , [])

    return (
        <div className="card mt-2" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height : "150px" , objectFit : "fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className='container w-100 '>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {
                            Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )

                            })
                        }
                    </select>
                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {
                            priceOptions.map((item) => {
                                return(
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
                </div>
                <hr/>
                    <button className='btn btn-success justify-center ms-2' onClick={cartHandler}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Card
