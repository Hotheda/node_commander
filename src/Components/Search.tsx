import React, { useState } from 'react'
interface ClickProps {
    //searchForBtn: (event: React.MouseEvent<HTMLButtonElement>) => void
    searchForBtn: (searchstring: string, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Search:React.FC<ClickProps> = ({searchForBtn}) => {
    const [searchString, setSearchString] = useState<string>("")

    return(
        <div className="search_div">
            <h3 className="search_topic"> Search for:  </h3>
            <div className="search_input_div">
                <form>
                    <input className="search_input" value={searchString} onChange = {(e)=>setSearchString(e.target.value)} />
                    <button className="search_button" onClick = {(e) => searchForBtn(searchString, e)} >&lt; Search... &gt;</button>
                </form>
            </div>
        </div>
    )

}

export default Search;