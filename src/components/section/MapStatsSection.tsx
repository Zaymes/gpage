"use client";
import { useState } from 'react';
import Map from '../Map';
import InfoPanel from '../InfoPanel';
import {useWard} from '../../app/ProfileContext'

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
  const {ward} = useWard()
    console.log('ward that has been selected',ward);
  
    // const handleWardSelect = (ward: Ward):void =>  {
    //   setWard(ward); // Update state with the selected ward's data
    // };
    return(
        <div style={{ display: 'flex' }}>
        {/* Sidebar to show selected ward details */}
        <div style={{ width: '60%', padding: '10px', backgroundColor: '#F3F9FD', color:'black' }}>
          {/* <h1 className='p-4 text-xl font-bold '>Tulsipur Sub-Metropolitan City</h1> */}
          {ward === 'Municipal' ? (
            <InfoPanel wardNumber="municipal"/>
          ) : (
            <InfoPanel wardNumber={ward}/>
          )}
        </div>
    
        {/* Main map content */}
        {/* F3F9FD  F8F9FA*/}
        <div style={{ flexGrow: 1, backgroundColor:'#F3F9FD', padding:'10px'}}>
          <Map />
        </div>
      </div>
    )
}