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
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [searchData, setSearchData] = useState([]);
  const [selectedElement, setSelectedElement] = (useState<string>("searchInput"))

  const [addNew, setAddNew] = useState<boolean>(false)

  const getData = (searchString:string) => {
    fetch('http://odehammar.com:5555/getposts/'+searchString)
        .then(res => res.json())
        .then(data => {
            if(data)
              setSearchData(data);
        })
        .catch(err => console.log("Error ", err))
        setSelectedItem(0)
  }

  const searchForBtn = ( searchstring:string, e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    getData(searchstring);
  }

  const handleKeyPress = ( e:React.KeyboardEvent<HTMLInputElement> ) => {
    if( e.key==="ArrowUp" && selectedItem > 0 ){
      setSelectedItem( selectedItem - 1 )
    }else if (e.key === "ArrowDown" && selectedItem<searchData.length - 1 ){
      setSelectedItem( selectedItem + 1 )
    }
  }

  const selectItem = (index:number) => {
    setSelectedItem(index);
  }

  return (
    <div className="BaseApp">
        <div className="dos_background">
        <div className="app_topic">
          <p>NODE COMMANDER v1.0 </p>
          <p>(c) 1987 HedaSoft, ALL RIGHTS RESERVED</p>
        </div>
          <AddCommand addNew={addNew} setAddNew={setAddNew}/>
          <Search searchForBtn = {searchForBtn} handleKeypress = {handleKeyPress} addNew={addNew}/>
          <SearchResults searchData = {searchData} selectItem = {selectItem}  selectedItem = {selectedItem} selectedIndex = {5}/>
          <Command selectedItemData = {searchData[selectedItem]} />
        </div>
    </div>
  );
}

export default App;
