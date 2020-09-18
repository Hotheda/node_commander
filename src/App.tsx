import React, { useState } from 'react';
import AddCommand from './Components/AddCommand';
import Command from './Components/Command'
import Search from './Components/Search'
import SearchResults from './Components/SearchResults';

// går att använda för att inte få undefined?
interface item {
  id:number,
  name:string,
  platform:string,
  description:string,
  options:string,
  howTo:string
}

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchData, setSearchData] = useState();

  const getData = (searchString:string) => {
    fetch('http://192.168.1.153:5555/getposts/'+searchString)
        .then(res => res.json())
        .then(data => {
            if(data)
              setSearchData(data);
              //console.log(searchData);
        })
        .catch(err => console.log("Error ", err))
  }

  const searchForBtn = ( searchstring:string, e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    getData(searchstring);
  }

  const selectItem = (item:any) => {
    setSelectedItem(item);

  }

  return (
    <div className="BaseApp">
        <h1 className="app_topic">Node commander</h1>
        <AddCommand/>
        <Search searchForBtn = {searchForBtn}/>
        <SearchResults searchData = {searchData} selectItem = {selectItem} />
        <Command selectedItem = {selectedItem} />
    </div>
  );
}

export default App;
