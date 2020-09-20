import React from 'react'
interface Props {
    searchData:any;
    selectItem: (id:any) => void;
}

const SearchResults:React.FC<Props> = ({searchData, selectItem}) => {
    //console.log("From searchlist: " + searchData)
    
    var dataToPrint = [];
       
    if(searchData)
    dataToPrint = searchData.map((item:any) => {
        return(
            <li className = "result_listitem" key = {item.id} onClick = {()=>{selectItem(item)}} >
                <p>{item.name.toUpperCase()}</p>
                <p>{item.platform.toUpperCase()}</p>
            </li>
            )
        })
        
    return(
        <div className="result_background">
            <div className = "result_div">
                {/*<h3 className = "result_topic">-=&lt; R E S U L T S &gt;=-</h3>*/}
                <ul className = "result_list">
                    <li className = "result_listitem result_listtopic" >
                        <p>NAME</p>
                        <p>PLATFORM</p>
                    </li>
                    <li className = "result_listitem result_listtopic" >
                        <p>----------</p>
                        <p>----------</p>
                    </li>
                    {dataToPrint}
                </ul>
            </div>
        </div>
    )
}

export default SearchResults;