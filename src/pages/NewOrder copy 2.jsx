import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import "./styles/newOrder.css";
import { useLocation, useNavigate } from 'react-router-dom';


const NewOrder = () => {
    const [createdata, setCreatedata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()
    const selectedOrder = location.state

    //!react-hook-form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm(
        {
            defaultValues: {
                producktName: selectedOrder?.producktName || null,
                productDescription: selectedOrder?.productDescription || null,
                numOfProduct: selectedOrder?.numOfProduct || null,
            },
        }
    );

    const onSubmit = async (data) => {
        alert(JSON.stringify(data));
        setLoading(true);

        try {
            let apiEndpoint = 'http://127.0.0.1:5000/api/v1/orders/createOrder';
            let method = 'POST';

            // selectedOrder durumuna göre API endpointini ve yöntemi güncelle
            if (selectedOrder) {
                apiEndpoint = `http://127.0.0.1:5000/api/v1/orders/updateOrder/${selectedOrder._id}`;
                method = 'PATCH';
            }

            const response = await fetch(apiEndpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // setCreatedata(result);
        } catch (error) {
            // setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    // console.log(watch("example"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Product Name</label>
            <input
                {...register("producktName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z\s]+$/i
                })}
            />
            {errors?.producktName?.type === "required" && <p>This field is required</p>}
            {errors?.producktName?.type === "maxLength" && (
                <p>First name cannot exceed 20 characters</p>
            )}
            {errors?.producktName?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}


            <label>Product Description</label>
            <input {...register("productDescription", { pattern: /^[A-Za-z\s]+$/i })} />
            {errors?.productDescription?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}

            <label>Number of Product </label>a
            <input type="number" {...register("numOfProduct", { min: 5, max: 25 })} />
            {errors.numOfProduct && (
                <p>You must enter the number of products more than 5 and less than 25</p>
            )}

            <input type="submit" />
        </form>
    )
}
export default NewOrder