

import React from "react";

const Bounderi= function({children}){
    return(
        <div className=' w-full
        h-auto
        mx-auto
        flex-col
        flex
        items-center
      bg-neutral-800 '>
          <div  className="
          w-[97%]
          h-auto"
          >
     {children}

            </div>
            </div>
    )
}

export default Bounderi