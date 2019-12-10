import React from "react";
import Loader from "react-loader-spinner";
 export const Loading = () => {

    return (
        <div style={{ position: "fixed", top: "40%", left: "45%" }}>
            <Loader type="Oval" color="#00BFFF" height={100} width={100} />
            </div>
    )
}