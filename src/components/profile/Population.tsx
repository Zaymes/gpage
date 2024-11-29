'use client'
import { useEffect, useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useLocale } from 'next-intl';
import { fetchUniqueColumnValues } from "@/lib/api/ckan";
import WarwiseVizWrapper from '../WardWiseVizWrapper';
import DistributionVizWrapper from '../DistributionVizWrapper';
import TimeSeriesWrapper from '../TimeSeriesWrapper';

export default function PopulationContent({category}:{category:string}) {

    const [wardDataIndicators, setWardDataIndicators] = useState([]);
    const [categoryDataIndicators, setCategoryDataIndicators] = useState([]);
    const [yearlyDataIndicators, setYearlyDataIndicators] = useState([]);
    const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    const language = useLocale();
    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const [wardData, categoryData, yearlyData] = await Promise.all([
                    fetchUniqueColumnValues('f8791dae-3839-4e9d-9dd0-f68edd0ade75', 'indicator_code', category),
                    fetchUniqueColumnValues('9f5f3673-ed24-4f9d-ac55-da769264e1c3', 'indicator_code', category),
                    fetchUniqueColumnValues('a80e6f91-718e-4af5-a0ac-cfafc2858bad', 'indicator_code', category),
                ]);
                setWardDataIndicators(wardData);
                setCategoryDataIndicators(categoryData);
                setYearlyDataIndicators(yearlyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchIndicators();
    }, [category]);

    console.warn('WARD data indicators', yearlyDataIndicators)

    return (
        <div className='h-full'>
            <h1 className='text-slate-900 font-bold text-xl'>Wardwise Comparisom</h1>
            {wardDataIndicators.map((item: string, index: number) =>
            (<div key={index}>
                <WarwiseVizWrapper wardData={wardData} language={language} indicatorCode={item} />
            </div>))}
            {categoryDataIndicators.map((item: string, index: number) =>
            (<div key={index}>
                <DistributionVizWrapper wardData={categoryData} language={language} indicatorCode={item} />
            </div>))}
            {yearlyDataIndicators.map((item: string, index: number) =>
                <div key={index}>
                    <TimeSeriesWrapper wardData={yearlyData} language={language} indicatorCode={item}/>
                </div>
            )}
        </div>
    )

}