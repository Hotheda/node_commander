import React, { useState } from 'react'
interface ClickProps {
    searchForBtn: (searchstring: string, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    addNew: boolean
}

const Search:React.FC<ClickProps> = ({searchForBtn, addNew}) => {
    const [searchString, setSearchString] = useState<string>("")

    const focusInput = (target:EventTarget & HTMLInputElement) => {
        if(!addNew)
            target.focus()
    }

    var inputlabel = "search :>"
    return(
        <div className="search_div">
            <h3 className="search_topic"> Search for:  </h3>
                <form>
                    <div className="search_input_div">
                        <div>
                            <label className="search_input">{inputlabel}</label>
                            <input className="search_input" autoFocus={true} onBlur={({ target }) => focusInput(target)} autoComplete="off" value={searchString} spellCheck="false" onChange = {(e)=>setSearchString(e.target.value)} />
                        </div>
                        <button className="search_button button" onClick = {(e) => searchForBtn(searchString, e)} >&lt; Search &gt;</button>
                </div>
            </form>
        </div>
    )

}

export default Search;