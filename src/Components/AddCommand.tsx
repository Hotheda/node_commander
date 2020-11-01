import React from "react"

interface Props {
    addNew: boolean,
    setAddNew: React.Dispatch<React.SetStateAction<boolean>>
}


const AddCommand:React.FC<Props> = ({addNew, setAddNew}) => {
    return(
        <div className="add_command_button_div">
            <button className="button" onClick={()=>{setAddNew(!addNew)}} >{addNew ? "Cancel" : "Add command"}</button>
        </div>
    )
}

export default AddCommand;