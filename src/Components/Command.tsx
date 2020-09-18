import React, { useEffect, useState } from "react";

/*interface item {
    id:number,
    name:string,
    platform:string,
    description:string,
    options:string,
    howTo:string
}*/

interface Props {
    selectedItem:any;
}


const Command:React.FC<Props> = ({selectedItem}) => {
    // name: , howTo: , options: , platform: , description: 
    //const [allData, setAllData] = useState<any>();
    const allData = selectedItem;

    /*
    useEffect(() => {
        getData();
    },[]);

    const id:number = selectedItem;

    const getData = () => {
        fetch('http://192.168.1.153:5555/getpost/'+id.toString())
            .then(res => res.json())
            .then(data => {
                if(data)
                    setAllData(data);
            })
            .catch(err => console.log("Error ", err))
    }*/
    
    console.log(selectedItem)
    //console.log(allData);

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