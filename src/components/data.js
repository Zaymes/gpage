// import { Info, Users, UserFemale, Population, Percent, Child, ChildFemale, Book, Family } from 'lucide-react';

import { Info, Users, Population, Percent, Child, ChildFemale, Book, Family, User } from 'lucide-react';

const data01 = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    }
];
const data02 = [
    {
        "name": "Group A",
        "value": 2400
    },
    {
        "name": "Group B",
        "value": 4567
    },
    {
        "name": "Group C",
        "value": 1398
    },
    {
        "name": "Group D",
        "value": 9800
    },
    {
        "name": "Group E",
        "value": 3908
    },
    {
        "name": "Group F",
        "value": 4800
    }
];
const colors = [
    "#6ABDE7", "gray", "#E56790", "#FDBF50", "#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c",
    "#d4a1c1", "#a3a1d4", "#f3d6e4", "#d4f0f0", "#f4b6c2",
    "#c2f0b6", "#f0e68c"
];


const dataCardData = [
    {
        icon: Info,
        name: 'Total Families',
        value: 12345,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Average Family Size',
        value: 4.2,
        source: 'Household Survey 2022'
    },
    {
        icon: Users,
        name: 'Joint Families',
        value: 6789,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Female Head of Family',
        value: 38.4,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Total Population',
        value: 123456789,
        source: 'Census Data 2023'
    },
    {
        icon: Percent,
        name: 'Sex Ratio',
        value: 943,
        source: 'Census Data 2023'
    },
    {
        icon: Percent,
        name: 'Population Growth Rate',
        value: 1.2,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Children Population',
        value: 28.3,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Child Sex Ratio',
        value: 919,
        source: 'Census Data 2023'
    },
    {
        icon: Book,
        name: 'Literacy Ratio',
        value: 74.0,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Nuclear Families',
        value: 8765,
        source: 'Census Data 2023'
    },
    {
        icon: Users,
        name: 'Single Parent Families',
        value: 1234,
        source: 'Census Data 2023'
    }
];

const religionData = [
    { label: "Hindu", population: 21500000 },
    { label: "Buddhist", population: 2800000 },
    { label: "Muslim", population: 1400000 },
    { label: "Kirant", population: 800000 },
    { label: "Christian", population: 400000 },
    { label: "Other", population: 200000 }
];

const ethnicityData = [
    { label: "Chhetri", population: 4300000 },
    { label: "Brahmin (Hill)", population: 3200000 },
    { label: "Magar", population: 1900000 },
    { label: "Tharu", population: 1700000 },
    { label: "Tamang", population: 1600000 },
    { label: "Newar", population: 1400000 },
    { label: "Kami", population: 1300000 },
    { label: "Muslim", population: 1300000 },
    { label: "Yadav", population: 1200000 },
    { label: "Rai", population: 620000 }
];

const languagesData = [
    { label: "Nepali", population: 17000000 },
    { label: "Maithili", population: 3000000 },
    { label: "Bhojpuri", population: 1500000 },
    { label: "Tharu", population: 1300000 },
    { label: "Tamang", population: 1200000 },
    { label: "Newari", population: 840000 },
    { label: "Bajjika", population: 800000 },
    { label: "Magar", population: 770000 },
    { label: "Doteli", population: 770000 },
    { label: "Urdu", population: 400000 }
];

const pie_test_data = [
    { name: 'Hindu', value: 173946 },
    { name: 'Christian', value: 2056 },
    { name: 'Buddhist', value: 1466 },
    { name: 'Muslim', value: 1082 },
    { name: 'Kirat', value: 15 },
    { name: 'Prakriti', value: 1186 },
    { name: 'Bahai', value: 4 }
];

const rural_population = [
    { name: 'Urban', value: 48767 },
    { name: 'Peri Urban', value: 94901 },
    { name: 'Rural', value: 36078 },
];

// Example usage
const bar_data = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
];

const horizontal_bar = [
    { category: 'क्षेत्री', value: 29542 },
    { category: 'थारु', value: 18428 },
    { category: 'ब्राह्मण-पहाड', value: 10485 },
    { category: 'मगर', value: 7569 },
    { category: 'विश्वकर्मा/कामी', value: 6318 },
    { category: 'परियार/दमाई', value: 3069 },
    { category: 'सन्यासी/दसनमी', value: 1945 },
    { category: 'ठकुरी', value: 1560 },
    { category: 'मिजार/सार्की', value: 1467 },
    { category: 'ब्राह्मण-तराई', value: 746 },
    { category: 'नेवा(नेवार)', value: 664 },
    { category: 'गुरुङ', value: 376 },
    { category: 'मुसलमान', value: 414 },
    { category: 'विदेशी', value: 293 },
    { category: 'नखुलेको', value: 73 },
    { category: 'अन्य', value: 1815 }
];

const populationByWards = [
    {
        wardnumber: 'ward 1',
        Male: 120,
        Female: 115
    },
    {
        wardnumber: 'ward 2',
        Male: 130,
        Female: 125
    },
    {
        wardnumber: 'ward 3',
        Male: 140,
        Female: 138
    },
    {
        wardnumber: 'ward 4',
        Male: 150,
        Female: 145
    },
    {
        wardnumber: 'ward 5',
        Male: 160,
        Female: 155
    },
    {
        wardnumber: 'ward 6',
        Male: 170,
        Female: 165
    },
    {
        wardnumber: 'ward 7',
        Male: 180,
        Female: 175
    },
    {
        wardnumber: 'ward 8',
        Male: 190,
        Female: 185
    },
    {
        wardnumber: 'ward 9',
        Male: 200,
        Female: 195
    },
    {
        wardnumber: 'ward 10',
        Male: 210,
        Female: 205
    },
    {
        wardnumber: 'ward 11',
        Male: 220,
        Female: 215
    },
    {
        wardnumber: 'ward 12',
        Male: 230,
        Female: 225
    },
    {
        wardnumber: 'ward 13',
        Male: 240,
        Female: 235
    },
    {
        wardnumber: 'ward 14',
        Male: 250,
        Female: 245
    },
    {
        wardnumber: 'ward 15',
        Male: 260,
        Female: 255
    },
    {
        wardnumber: 'ward 16',
        Male: 270,
        Female: 265
    },
    {
        wardnumber: 'ward 17',
        Male: 280,
        Female: 275
    },
    {
        wardnumber: 'ward 18',
        Male: 290,
        Female: 285
    },
    {
        wardnumber: 'ward 19',
        Male: 300,
        Female: 295
    }
];

const population_gender_ethnicity = [
    {
        "category": "क्षेत्री",
        "Male": 29542,
        "Female": 33823
    },
    {
        "category": "थारु",
        "Male": 18428,
        "Female": 19897
    },
    {
        "category": "ब्राह्मण-पहाड",
        "Male": 10485,
        "Female": 11505
    },
    {
        "category": "मगर",
        "Male": 7569,
        "Female": 8685
    },
    {
        "category": "विश्वकर्मा/कामी",
        "Male": 6318,
        "Female": 7161
    },
    {
        "category": "परियार/दमाई",
        "Male": 3069,
        "Female": 3620
    },
    {
        "category": "सन्यासी/दसनमी",
        "Male": 1945,
        "Female": 2225
    },
    {
        "category": "ठकुरी",
        "Male": 1560,
        "Female": 1782
    },
    {
        "category": "मिजार/सार्की",
        "Male": 1467,
        "Female": 1649
    },
    {
        "category": "ब्राह्मण-तराई",
        "Male": 746,
        "Female": 804
    },
    {
        "category": "नेवा(नेवार)",
        "Male": 664,
        "Female": 795
    },
    {
        "category": "गुरुङ",
        "Male": 376,
        "Female": 459
    },
    {
        "category": "मुसलमान",
        "Male": 414,
        "Female": 380
    },
    {
        "category": "विदेशी",
        "Male": 293,
        "Female": 179
    },
    {
        "category": "नखुलेको",
        "Male": 73,
        "Female": 86
    },
    {
        "category": "अन्य",
        "Male": 1815,
        "Female": 1941
    }
];

const absenteePopulation = {
    datas: [
        {
            category: 'Residing in Municipality',
            Male: 84764,
            Female: 94991,
            Total: 179755,
            caption: {
                number: '1',
                indicator: 'absentee population',
                description:
                    'Among 14,851 individuals residing abroad, males make up 88% of the population.',
                source: 'Municipality Records',
            },
        },
        {
            category: 'Residing in Other Parts of Nepal',
            Male: 6066,
            Female: 3692,
            Total: 9758,
            caption: {
                number: '1',
                indicator: 'absentee population',
                description:
                    'Among 14,851 individuals residing abroad, males make up 88% of the population.',
                source: 'Municipality Records',
            },
        },
        {
            category: 'Residing Abroad',
            Male: 13089,
            Female: 1762,
            Total: 14851,
            caption: {
                number: '1',
                indicator: 'absentee population',
                description:
                    'Among 14,851 individuals residing abroad, males make up 88% of the population.',
                source: 'Municipality Records',
            },
        },
    ],
    title: 'Absentee Population Status',
};

const population_by_language = [
    { category: "Nepali", Male: 44.5, Female: 45.2 },
    { category: "Maithili", Male: 11.5, Female: 10.7 },
    { category: "Bhojpuri", Male: 6.7, Female: 5.9 },
    { category: "Tharu", Male: 5.8, Female: 5.8 },
    { category: "Tamang", Male: 4.9, Female: 4.9 },
    { category: "Bajjika", Male: 4.0, Female: 3.8 },
    { category: "Avadhi", Male: 3.0, Female: 2.9 },
    { category: "Nepalbhasha (Newari)", Male: 3.0, Female: 2.9 },
    { category: "Magar Dhut", Male: 2.7, Female: 2.9 },
  ];

const wardwise_family = [
    {
        "wardnumber": "ward 1",
        "Value": 1232
    },
    {
        "wardnumber": "ward 2",
        "Value": 1182
    },
    {
        "wardnumber": "ward 3",
        "Value": 2003
    },
    {
        "wardnumber": "ward 4",
        "Value": 2338
    },
    {
        "wardnumber": "ward 5",
        "Value": 3608
    },
    {
        "wardnumber": "ward 6",
        "Value": 6073
    },
    {
        "wardnumber": "ward 7",
        "Value": 3526
    },
    {
        "wardnumber": "ward 8",
        "Value": 2208
    },
    {
        "wardnumber": "ward 9",
        "Value": 3773
    },
    {
        "wardnumber": "ward 10",
        "Value": 1600
    },
    {
        "wardnumber": "ward 11",
        "Value": 2150
    },
    {
        "wardnumber": "ward 12",
        "Value": 2673
    },
    {
        "wardnumber": "ward 13",
        "Value": 1480
    },
    {
        "wardnumber": "ward 14",
        "Value": 1627
    },
    {
        "wardnumber": "ward 15",
        "Value": 1928
    },
    {
        "wardnumber": "ward 16",
        "Value": 1907
    },
    {
        "wardnumber": "ward 17",
        "Value": 2292
    },
    {
        "wardnumber": "ward 18",
        "Value": 2384
    },
    {
        "wardnumber": "ward 19",
        "Value": 2034
    }
]


export {
    data01, data02, colors, dataCardData, pie_test_data, bar_data, horizontal_bar, rural_population, populationByWards,
    population_gender_ethnicity, absenteePopulation, population_by_language, wardwise_family
}