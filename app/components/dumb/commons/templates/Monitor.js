import React from 'react';

export const Monitor = ({data})=>{
    /*Data gets mutated when we just use data.reverse, so we are creating its copy first and than reversing it*/
   const reverseList=[...data].reverse();
    const items = reverseList.map((item) => {
        const KEY1 = Object.keys(item)[1];
        const KEY2 = Object.keys(item)[2];
        return (<li key={item.id} className="monitor-data-box">
            {KEY1} : {item[KEY1]}<br/>
            {KEY2} : {item[KEY2]}<br/><br/>
            </li>);
    });
        return (
            <div className="monitor white-box">
                <h1 className="white-center">List of Quotes Added</h1>
                <ul>{items}</ul>
            </div>
        );
    };

Monitor.propTypes={
  data:React.PropTypes.array.isRequired
};