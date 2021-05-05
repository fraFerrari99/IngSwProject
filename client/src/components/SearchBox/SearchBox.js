import React from 'react';


const SearchBox = (props) => {
  
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"0.1em solid blue", padding:"0.5rem"};
  return (
    <input type='search' className='search' style={BarStyling} placeholder={"Type here..."}
     onChange={props.handleChange}
    />
  );
}

export default SearchBox