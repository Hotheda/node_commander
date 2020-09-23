import React, { useState } from 'react'
interface ClickProps {
    searchForBtn: (searchstring: string, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    handleKeypress: (e:React.KeyboardEvent<HTMLInputElement>) => void,
    addNew: boolean
}

const Search:React.FC<ClickProps> = ({searchForBtn, handleKeypress, addNew}) => {
    const [searchString, setSearchString] = useState<string>("")

    const focusInput = (target:EventTarget & HTMLInputElement) => {
        if(!addNew){
            target.focus()
            target.selectionStart = searchString.length;
        }
    }

    var inputlabel = "Search :>"
    return(
        <div className="search_div">
            <h3 className="search_topic"> Search for:  </h3>
                <form>
                    <div className="search_input_div">
                        <div>
                            {/*<label className="search_input">{inputlabel}</label>*/}
                            <input className="search_input" autoFocus={true}
                                onBlur={({ target }) => focusInput(target)}
                                autoComplete="off" value={searchString}
                                spellCheck="false"
                                onChange = {(e) => setSearchString(e.target.value)}
                                onKeyDown = {(e) => handleKeypress(e)}
                            />
                            <p className = "search_input_paragraf">{inputlabel} {searchString}.</p>
                        </div>
                        <button className="search_button button" onClick = {(e) => searchForBtn(searchString, e)} >&lt; Search &gt;</button>
                </div>
            </form>
        </div>
    )

}

export default Search;