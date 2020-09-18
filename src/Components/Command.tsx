import React, { useEffect, useState } from "react";

interface Props {
    selectedItem:any;
}


const Command:React.FC<Props> = ({selectedItem}) => {
    const allData = selectedItem;
    
    console.log(selectedItem)

    if(allData)
    return(
        <div>
            <h2>Name: {allData.name}</h2>
            <h3>Platform: {allData.platform}</h3>
            <p>Description: {allData.description}</p>
            <p>Can be used with: {allData.options}</p>
            <p>Examples: {allData.howTo}</p>
        </div>
    )

    return(
        <div>no data, loading....</div>
    )
}

export default Command;