import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const navigate = useNavigate();
    return (
        <div style={{ width: "100vw", height: "100vh", border: "2px solid red", backgroundColor:"gray" , display: "flex",gap:"50px", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
           <button onClick={()=>navigate("/allorders")} >ALL ORDERS</button>
            <button onClick={() => navigate("/neworder")} >NEW ORDER</button>
        </div>
    )
}

export default MainLayout