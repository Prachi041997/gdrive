import React from 'react';
import './Brand.css'
const Brand = ({color}) => {
    return <div id='brandTitle'>
        <div id='circle' style={{color:color, border:`1px solid ${color}`}}><i class="ri-drive-fill" style={{color:color}}></i></div>
        <div><h1 id='head' style={{color:color}}>DropBox</h1></div>
    </div>
}
export default Brand;