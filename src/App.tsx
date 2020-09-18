import React, { useState } from 'react';
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

  const searchForBtn = (searchstring:string) => {
    //console.log("Search for: " + searchstring)
    getData(searchstring);
  }

  const selectItem = (item:any) => {
    setSelectedItem(item);

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Node commander</h1>
        <hr/>
        <Search searchForBtn = {searchForBtn}/>
        <hr/>
        <SearchResults searchData = {searchData} selectItem = {selectItem} />
        <hr/>
        <Command selectedItem = {selectedItem} />
      </header>
    </div>
  );
}

export default App;
