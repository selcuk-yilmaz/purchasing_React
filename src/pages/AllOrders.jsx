import React, { useState } from 'react'

const AllOrders = () => {
    const [getdata, setGetdata] = useState(null);
    // const [updatedata, setUpdatedata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const handleGetAllOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/orders/getAllOrders', {
                method: 'GET', // GET yöntemi kullanılıyor
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setGetdata(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    // const handleUpdateData = async ()=>{
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const response = await fetch('http://127.0.0.1:5000/api/v1/orders/', {
    //             method: 'GET', // GET yöntemi kullanılıyor
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         console.log(data);
    //         setUpdatedata(data);
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    return (
        <div style={{ width: "100vw", height: "100vh", border: "2px solid red", backgroundColor: "gray", display: "flex", gap: "50px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <button onClick={handleGetAllOrders} disabled={loading}>
                {loading ? 'Loading...' : 'Get Data'}
            </button>
            {error && <div style={{ color: 'red' }}>{error.message}</div>}
            {getdata && <div>Response: {JSON.stringify(getdata)}</div>}
            {/* <button onClick={handleUpdateData} disabled={loading}>
                {loading ? 'Loading...' : 'Update Data'}
            </button>
            {updatedata && <div>Response: {JSON.stringify(getdata)}</div>} */}
        </div>
    )
}

export default AllOrders