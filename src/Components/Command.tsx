import React, { useEffect, useState } from "react";


interface Props {
    selectedItem:any;
}


const Command:React.FC<Props> = ({selectedItem}) => {
    const allData = selectedItem;
    
    
    const deleteCommand = () => {
        fetch("http://192.168.1.153:5555/deletepost/"+selectedItem.id,{
            method: "DELETE"
        })
        .then(res => { return res.json() })
        .then(data => console.log(data))
        .catch(err => console.log("Error", err))
    }

    if(allData)
    return(
        <div>
            <h2>Name: {allData.name}</h2>
            <h3>Platform: {allData.platform}</h3>
            <p>Description: {allData.description}</p>
            <p>Can be used with: {allData.options}</p>
            <p>Examples: {allData.howTo}</p>
            <button>Edit command</button>
            <button onClick={() => deleteCommand()} >DELETE COMMAND</button>
        </div>
    )

    return(
        <div>no data, loading....</div>
    )
}

export default Command;