import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
    const [getdata, setGetdata] = useState(null);
    // const [updatedata, setUpdatedata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

useEffect(() => {
    handleGetAllOrders()
}, [])

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
            console.log(data.allOrders);
            setGetdata(data.allOrders);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    const handleDeleteOrder= async (id)=>{
        console.log(id)
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/orders/deleteOrder/${id}`, {
                method: 'DELETE', // GET yöntemi kullanılıyor
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // const data = await response.json();
            console.log(response);
            await handleGetAllOrders()
        } catch (error) {
            // setError(error);
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ width: "100vw", height: "100vh", border: "2px solid red", backgroundColor: "gray", display: "flex", gap: "50px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <button onClick={handleGetAllOrders} disabled={loading}>
                {loading ? 'Loading...' : 'Get Data'}
            </button>
            {error && <div style={{ color: 'red' }}>{error.message}</div>}
            {
                getdata?.map((ord) => (
                    <div key={ord._id} style={{ width: "50vw", height: "20vh", border: "2px solid red", display: "flex", gap: "5px", justifyContent: "space-between", alignItems: "center" }} >
                        <span className="material-icons">
                            auto_awesome
                        </span>
                        <span>{ord.producktName}</span>
                        <span>{ord.numOfProduct}</span>
                        <span>{ord?.productDescription?.slice(0, 10)}</span>

                        <span className="material-icons"
                         onClick={() =>
                            navigate('/neworder', {
                                state: ord,
                                replace: false,
                            })
                        }>
                            edit_note
                        </span>
                        <span onClick={()=>handleDeleteOrder(ord._id)} className="material-icons">delete_sweep</span>
                    </div>
                ))
            }
            {/* <button onClick={handleUpdateData} disabled={loading}>
                {loading ? 'Loading...' : 'Update Data'}
            </button>
            {updatedata && <div>Response: {JSON.stringify(getdata)}</div>} */}
        </div>
    )
}

export default AllOrders