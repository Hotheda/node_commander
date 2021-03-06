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
  const [editItemData, setEditItemData] = useState<DBCommandObject>({name:"",platform:"",description:"",options:"",howTo:""})  
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

  const editItem = () => {
    setEditItemData(searchData[selectedMenuItem])
    setAddNew(true)
  }


  const searchForBtn = ( searchstring:string, e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    var tempElement:DBCommandObject|any = {...editItemData}
    if(addNew){     
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
        setEditString(tempElement.howTo)
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
        setEditItemData({name:"",platform:"",description:"",options:"",howTo:""})
        setAddNew(true)
      }else if(searchstring==="/edit"){
        editItem()
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
        if(editItemData)
          setEditString(editItemData.name)
      }
    }
  }else{
    if(selectedElement !== "Search"){
      getData(editItemData.name);
      setSelectedMenuItem(0)
      setEditString("")
      setSelectedElement("Search")
    }
  }

  const handleKeyPress = ( e:React.KeyboardEvent<HTMLInputElement> ) => {
    if( e.key==="ArrowUp" && selectedMenuItem > 0 && !addNew){
      setSelectedMenuItem( selectedMenuItem - 1 )
    }else if (e.key === "ArrowDown" && selectedMenuItem<searchData.length - 1 && !addNew){
      setSelectedMenuItem( selectedMenuItem + 1 )
    }else if (e.key === "Escape" && addNew === true){
      setEditString("")
      setAddNew(false)
    }else if (e.key === "Backspace" && addNew === true){
      if(editString !== "")
        setEditString("")
    }else{
      //console.log(e.key)
    }
  }

  const selectItem = (index:number) => {
    setSelectedMenuItem(index);
  }

  var selectedOrEditItem = editItemData;
  if(!addNew){
    selectedOrEditItem = searchData[selectedMenuItem]
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
          <Command selectedItemData = {selectedOrEditItem} admin={admin} addNew = {addNew} editItem = {editItem} />
        </div>
    </div>
  );
}

export default App;
