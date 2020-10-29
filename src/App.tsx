import React, { useState } from 'react';
import AddCommand from './Components/AddCommand';
import Command from './Components/Command'
import Search from './Components/Search'
import SearchResults from './Components/SearchResults';
import DBCommandObject from "./Components/DBCommandObject"

    /**
     * Create login in node backend and enter credentials to edit or delete data from DB
     * ( admin state )
     */

const App: React.FC = () => {
  const [editItemData, setEditItemData] = useState<DBCommandObject>() //<any>({name:"",platform:"",description:"",options:"",howTo:""})  
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const [searchData, setSearchData] = useState([]);
  const [editString, setEditString] = useState<string>("");

  const [addNew, setAddNew] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = (useState<string>("Search"))

  const [admin, setAdmin] = useState<boolean>(false)

  const getData = (searchString:string) => {
    fetch('http://odehammar.com:5555/getposts/'+searchString)
        .then(res => res.json())
        .then(data => {
            if(data)
              setSearchData(data);
        })
        .catch(err => console.log("Error ", err))
        setSelectedMenuItem(0)
  }


  const searchForBtn = ( searchstring:string, e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    var tempElement:DBCommandObject|any = {...editItemData}
    if(addNew){
      console.log(tempElement)      
      if(selectedElement==="NAME"){
        tempElement.name = searchstring;
        setEditString(tempElement.platform)
        setSelectedElement("PLATFORM")
      }else if(selectedElement==="PLATFORM"){
        tempElement.platform = searchstring;
        setEditString(tempElement.description)
        setSelectedElement("DESCRIPTION")
      }
      else if(selectedElement==="DESCRIPTION"){
        tempElement.description = searchstring;
        setEditString(tempElement.options)
        setSelectedElement("OPTIONS")
      }else if(selectedElement==="OPTIONS"){
        tempElement.options = searchstring;
        setEditString(tempElement.example)
        setSelectedElement("EXAMPLE")
      }else if(selectedElement==="EXAMPLE"){
        tempElement.howTo = searchstring;
        setEditString("")
        postData(tempElement);
        setAddNew(false)
      }
      setEditItemData(tempElement)
    }else{
      if(searchstring==="/add"){
        setAddNew(true)
        setEditItemData({name:"",platform:"",description:"",options:"",howTo:""})
      }else if(searchstring==="/edit"){
        setAddNew(true)
        setEditItemData(searchData[selectedMenuItem])
      }else if(searchstring==="/login"){
        setAdmin(true)
      }else if(searchstring==="/logout"){
        setAdmin(false)      
      }else{
        getData(searchstring);
        setSelectedMenuItem(0)
      }
    }
  }

  const postData = (tempElement:DBCommandObject)=>{
    if(tempElement.id){
      fetch('http://odehammar.com:5555/updatepost/'+tempElement.id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tempElement)
      })
      .then(res => { return res.json() })
      .then(data => console.log(data))
      .catch(err => console.log("Error: ", err))
    }else{
      fetch('http://odehammar.com:5555/addpost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tempElement)
      })
      .then(res => { return res.json() })
      .then(data => console.log(data))
      .catch(err => console.log("Error: ", err))
    }
}
  
  if(addNew){
    if(selectedElement==="Search"){
      setSelectedElement("NAME")
      if(searchData[selectedMenuItem]){
        var tempdata:DBCommandObject = searchData[selectedMenuItem] 
        setEditString(tempdata.name)
      }
    }
  }else{
    if(selectedElement !== "Search"){
      setSelectedElement("Search")
    }
  }

  const handleKeyPress = ( e:React.KeyboardEvent<HTMLInputElement> ) => {
    if( e.key==="ArrowUp" && selectedMenuItem > 0 ){
      setSelectedMenuItem( selectedMenuItem - 1 )
    }else if (e.key === "ArrowDown" && selectedMenuItem<searchData.length - 1 ){
      setSelectedMenuItem( selectedMenuItem + 1 )
    }else if (e.key === "Escape" && addNew === true){
      setAddNew(false)
    }else{
      //console.log(e.key)
    }
  }

  const selectItem = (index:number) => {
    setSelectedMenuItem(index);
  }

  return (
    <div className="BaseApp">
        <div className="dos_background">
        <div className="app_topic">
          <p>NODE COMMANDER v1.0 </p>
          <p>(c) 1987 HedaSoft, ALL RIGHTS RESERVED</p>
        </div>
          <Search searchForBtn = {searchForBtn} handleKeypress = {handleKeyPress} addNew={addNew} selectedElement = {selectedElement} editString = {editString}/>
          {admin ? <AddCommand addNew={addNew} setAddNew={setAddNew} /> : null}
          <SearchResults searchData = {searchData} selectItem = {selectItem}  selectedItem = {selectedMenuItem} selectedIndex = {5}/>
          {addNew ? <Command selectedItemData = {editItemData} admin={admin}/> : <Command selectedItemData = {searchData[selectedMenuItem]} admin={admin} /> }
        </div>
    </div>
  );
}

export default App;
