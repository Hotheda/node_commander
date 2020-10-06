import React from "react";


interface Props {
    selectedItemData:any;
    admin: boolean;
}


const Command:React.FC<Props> = ({selectedItemData, admin}) => {
    const allData = selectedItemData;
    
    
    const deleteCommand = () => {
        if(window.confirm('DELETE POST ?')){
            fetch("http://192.168.1.153:5555/deletepost/"+selectedItemData.id,{
                method: "DELETE"
            })
            .then(res => { return res.json() })
            .then(data => console.log(data))
            .catch(err => console.log("Error", err))
        }
    }

    if(allData)
    return(
        <div>
            <div className="command_background">
                <p className = "command_topic topic">= {allData.name} </p>
                <p className = "command_platform topic">= {allData.platform} </p>
                <p className = "command_description topic" >= {allData.description} </p>
                <p className = "command_options topic" >= {allData.options} </p>
                <p className = "command_example topic" >= {allData.howTo} </p>
                {admin ? 
                    <div className="command_buttons_div">
                        <button className="button" >Edit</button>
                        <button className="button" onClick={() => deleteCommand()} >DELETE</button>
                    </div>
                : null}
            </div>
        </div>
    )

    return(
        <div>no data, loading....</div>
    )
}

export default Command;