import React from "react";
import '../../App.css';

const Rank = ( { name, entries }) => {
    return (
        <div>
            <div className="black f3 b">
                {`${name}, your current entry count is...`}
            </div>  
            <div className="black f1 b">
                {`${entries}`}
            </div> 
        </div>
    );
}

export default Rank;