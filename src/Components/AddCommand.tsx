import React, { useState } from "react"

const AddCommand:React.FC = () => {
    const [addNew, setAddNew] = useState<boolean>(false)

    const addToDB = () => {
        //check for all fields to be filled
        //post jSon object to db
    }
    
    if(addNew)
    return(
        <div>
            <h3>Add new item</h3>
            <label>Name: </label><input placeholder="name"/><br/>
            <label>Platform: </label><input placeholder="Platform"/><br/>
            <label>Description: </label><input placeholder="Description"/><br/>
            <label>Options: </label><input placeholder="Options"/><br/>
            <label>Example: </label><input placeholder="Example"/><br/>
            <button onClick={()=>{setAddNew(!addNew)}} >Add command</button>
        </div>
    )

    return(
        <div>
            <button onClick={()=>{setAddNew(!addNew)}} >Add command</button>
        </div>
    )
}

export default AddCommand;