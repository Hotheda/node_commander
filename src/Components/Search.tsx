import React, { useState } from 'react'
interface ClickProps {
    //searchForBtn: (event: React.MouseEvent<HTMLButtonElement>) => void
    searchForBtn: (searchstring: string) => void
}

const Search:React.FC<ClickProps> = ({searchForBtn}) => {
    const [searchString, setSearchString] = useState<string>("")

    return(
        <div>
            <h3>Search for: </h3>
            <input value={searchString} onChange = {(e)=>setSearchString(e.target.value)} />
            <button onClick = {() => searchForBtn(searchString)}>Search...</button>
        </div>
    )

}

export default Search;