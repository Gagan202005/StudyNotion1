import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {totalItems} = useSelector((state)=>state.cart);

    return (
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 flex flex-col">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5 montserrat">Cart</h1>
            <p className="border-b  border-b-richblack-400 pb-2 font-semibold text-richblack-400 crimson">{totalItems} Courses in Cart</p>

            {totalItems > 0 
            ? (<div className="mt-1 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            : (<p className="text-yellow-25 text-xl flex items-center justify-center w-full p-6" >Your Cart is Empty !</p>)}
        </div>
    )
}