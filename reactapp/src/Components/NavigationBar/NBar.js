import {React,useState} from "react";
import './NBar.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
const NBar=()=>{

    const [results,setResults]=useState([]);

    return (
        <div className="nav_bar">
            <span className="button-span">
                <button className="logo-btn">MoReAg</button>
            </span>
            <span className="search-bar-span">
                <SearchBar setResults={setResults}/>
                {results.length > 0 && <SearchResultsList results={results} />}
            </span>
            <ProfileDropDown/>
        </div>
    );
}
export default NBar;