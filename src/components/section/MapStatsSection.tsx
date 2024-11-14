"use client";
import { useState } from 'react';
import Map from '../Map';
import InfoPanel from '../InfoPanel';

interface Ward{
    district: string;
    district_code: number;
    fid: number;
    locallevel_code: number;
    locallevel_fullcode: number;
    locallevel_name: string;
    locallevel_name_nepali: string;
    locallevel_type: string;
    province: number;
    wards: number;
    }

export default function MapSection(){
    const [selectedWard, setSelectedWard] = useState(null);
    console.log('ward that has been selected',selectedWard);
  
    const handleWardSelect = (ward: Ward):void =>  {
      setSelectedWard(ward); // Update state with the selected ward's data
    };
    return(
        <div style={{ display: 'flex' }}>
        {/* Sidebar to show selected ward details */}
        <div style={{ width: '60%', padding: '10px', backgroundColor: '#f8f9fa', color:'black' }}>
          <h1 className='p-4 text-xl font-bold '>Tulsipur Sub-Metropolitan City</h1>
          {selectedWard ? (
            <InfoPanel wardNumber={selectedWard}/>
          ) : (
            <InfoPanel wardNumber="municipal"/>
          )}
        </div>
    
        {/* Main map content */}
        <div style={{ flexGrow: 1, backgroundColor:'#F8F9FA', padding:'10px' }}>
          <Map onWardSelect={handleWardSelect} />
        </div>
      </div>
    )
}