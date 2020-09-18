import React, { useState } from "react"

interface dbData {
    name: string,
    platform: string,
    description: string,
    options: string,
    howTo:  string
};


const AddCommand:React.FC = () => {
    const [addNew, setAddNew] = useState<boolean>(false)
    
    const [myData, setMyData] = useState<dbData>({name:"",platform:"",description:"",options:"",howTo:""});
    
    const postData = ()=>{
        fetch('http://192.168.1.153:5555/addpost', {
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
    }

    const onTextChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        var newData:dbData = myData;
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
    
    if(addNew)
    return(
        <div>
            <form>
                <h3>Add new item</h3>
                <label>Name: </label><input onChange={(e)=>onTextChange(e)} id="name" value={myData.name} placeholder="name" type="Text" required/><br/>
                <label>Platform: </label><input onChange={(e)=>onTextChange(e)} id="platform" value={myData.platform} placeholder="Platform" type="Text" /><br/>
                <label>Description: </label><input onChange={(e)=>onTextChange(e)} id="description" value={myData.description} placeholder="Description" type="Text" /><br/>
                <label>Options: </label><input onChange={(e)=>onTextChange(e)} id="options" value={myData.options} placeholder="Options" type="Text" /><br/>
                <label>Example: </label><input onChange={(e)=>onTextChange(e)} id="howTo" value={myData.howTo} placeholder="Example" type="Text" /><br/>
                <button onClick={(e) => {addToDB(e)}} >Add command</button>
                <button onClick={() => { setAddNew(!addNew); setMyData({name:"",platform:"",description:"",options:"",howTo:""}); }} >Cancel</button>
            </form>
        </div>
    )

    return(
        <div>
            <button onClick={()=>{setAddNew(!addNew)}} >Add command</button>
        </div>
    )
}

export default AddCommand;