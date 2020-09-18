import React from 'react'
interface Props {
    searchData:any;
    selectItem: (id:any) => void;
}

const SearchResults:React.FC<Props> = ({searchData, selectItem}) => {
    console.log("From searchlist: " + searchData)
    
    var dataToPrint = [];
    
    
    if(searchData)
    dataToPrint = searchData.map((item:any) => {
        return(
            <li key = {item.id} onClick = {()=>{selectItem(item)}} >Name: {item.name}</li>
            )
        })
        
    return(
        <div>
            <h3>Results</h3>
        <ul>
            {dataToPrint}
        </ul>
        </div>
    )
}

export default SearchResults;