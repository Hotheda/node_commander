import React, { useState } from 'react';
import AddCommand from './Components/AddCommand';
import Command from './Components/Command'
import Search from './Components/Search'
import SearchResults from './Components/SearchResults';

// går att använda för att inte få undefined?
interface commandItem {
  id:number,
  name:string,
  platform:string,
  description:string,
  options:string,
  howTo:string
}

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>({name:"",platform:"",description:"",options:"",howTo:""})
  const [searchData, setSearchData] = useState();
  
  const [addNew, setAddNew] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = (useState<string>("Search"))

  const getData = (searchString:string) => {
    fetch('http://odehammar.com:5555/getposts/'+searchString)
        .then(res => res.json())
        .then(data => {
            if(data)
              setSearchData(data);
        })
        .catch(err => console.log("Error ", err))
  }

  const searchForBtn = ( searchstring:string, e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    var tempElement:any = {...selectedItem}
    if(addNew){
      if(selectedElement==="NAME"){
        tempElement.name = searchstring;
        setSelectedElement("PLATFORM")
      }else if(selectedElement==="PLATFORM"){
        tempElement.platform = searchstring;
        setSelectedElement("DESCRIPTION")
      }
      else if(selectedElement==="DESCRIPTION"){
        tempElement.description = searchstring;
        setSelectedElement("OPTIONS")
      }else if(selectedElement==="OPTIONS"){
        tempElement.options = searchstring;
        setSelectedElement("EXAMPLE")
      }else if(selectedElement==="EXAMPLE"){
        tempElement.howTo = searchstring;
        postData(tempElement);
        setAddNew(false)
      }
      setSelectedItem(tempElement)
    }else{
      getData(searchstring);
    }
  }

  const postData = (tempElement:object)=>{
    fetch('http://odehammar.com:5555/addpost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempElement)
    })
    .then(res => { return res.json() })
    .then(data => console.log(data))
    .catch(err => console.log("Error: ", err))
}
  
  if(addNew){
    if(selectedElement==="Search"){
      setSelectedElement("NAME")
      setSelectedItem({name:"",platform:"",description:"",options:"",howTo:""})
    }
  }else{
    if(selectedElement !== "Search"){
      setSelectedElement("Search")
    }
  }

  const handleKeyPress = ( e:React.KeyboardEvent<HTMLInputElement> ) => {
  }

  const selectItem = (item:any) => {
    setSelectedItem(item);

  }

  return (
    <div className="BaseApp">
        <div className="dos_background">
        <div className="app_topic">
          <p>NODE COMMANDER v1.0 </p>
          <p>(c) 1987 HedaSoft, ALL RIGHTS RESERVED</p>
        </div>
          <AddCommand addNew={addNew} setAddNew={setAddNew}/>
          <Search searchForBtn = {searchForBtn} handleKeypress = {handleKeyPress} addNew={addNew} selectedElement = {selectedElement}/>
          <SearchResults searchData = {searchData} selectItem = {selectItem}  selectedItem = {selectedItem}/>
          <Command selectedItem = {selectedItem} />
        </div>
    </div>
  );
}

export default App;
