import React, { useState } from "react"

interface dbData {
    name: string,
    platform: string,
    description: string,
    options: string,
    howTo:  string
};

interface Props {
    addNew: boolean,
    setAddNew: React.Dispatch<React.SetStateAction<boolean>>
}


const AddCommand:React.FC<Props> = ({addNew, setAddNew}) => {
    //const [addNew, setAddNew] = useState<boolean>(false)
    
    const [myData, setMyData] = useState<dbData>({name:"",platform:"",description:"",options:"",howTo:""});
    
    const postData = ()=>{
        fetch('http://odehammar.com:5555/addpost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myData)
        })
        .then(res => { return res.json() })
        .then(data => console.log(data))
        .catch(err => console.log("Error: ", err))
    }

    const addToDB = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        postData();
        setAddNew(!addNew);
        resetData();
    }

    const onTextChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        /*var newData:dbData = myData;*/
        switch(e.target.id){
            case"name":
                setMyData({...myData, name: e.target.value});
                return;
            case"platform":
                setMyData({...myData, platform: e.target.value});
                return;
            case"description":
                setMyData({...myData, description: e.target.value});
                return;
            case"options":
                setMyData({...myData, options: e.target.value});
                return;
            case"howTo":
                setMyData({...myData, howTo: e.target.value});
                return;
        }
    }

    const resetData = () => {
        setMyData({name:"",platform:"",description:"",options:"",howTo:""});
    }
    
    return(
        <div className="add_command_button_div">
            <button className="button" onClick={()=>{setAddNew(!addNew)}} >Add command</button>
        </div>
    )
}

export default AddCommand;