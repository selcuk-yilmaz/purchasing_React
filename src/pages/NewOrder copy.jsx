import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import "./styles/newOrder.css";
const NewOrder = () => {
    const [createdata, setCreatedata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const postData = async (url = '', payload = {}) => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST', // POST yöntemi kullanılıyor
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(payload), // Gönderilecek veri JSON formatında
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         setCreatedata(data);
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSubmit = () => {
    //     const url = 'http://127.0.0.1:5000/api/v1/orders/createOrder'; // Gerçek endpoint URL'si
    //     const payload = {
    //         name: "robot-3",
    //         description: "warehouse autonom robots-3"
    //     };

    //     postData(url, payload);
    // };
    //!react-hook-form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        alert(JSON.stringify(data));
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/orders/createOrder', {
                method: 'POST', // POST yöntemi kullanılıyor
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Gönderilecek veri JSON formatında
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

    console.log(watch("example"));


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Product Name</label>
            <input
                {...register("producktName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
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
            <input {...register("productDescription", { pattern: /^[A-Za-z]+$/i })} />
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
        // <div style={{ width: "100vw", height: "100vh", border: "2px solid red", backgroundColor: "gray", display: "flex", gap: "50px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        //     <button onClick={handleSubmit} disabled={loading}>
        //         {loading ? 'Loading...' : 'Send Data'}
        //     </button>
        //     {error && <div style={{ color: 'red' }}>{error.message}</div>}
        //     {createdata && <div>Response: {JSON.stringify(createdata)}</div>}
        // </div>
    )
}
export default NewOrder