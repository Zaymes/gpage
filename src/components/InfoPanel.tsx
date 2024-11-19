// components/InfoPanel.js
// import styles from '../styles/globals.css'; // Style accordingly
import React, { useState } from 'react';
import { Users, Briefcase, HeartPulse, GraduationCap, Home, Bus, Trees, Shield, Lightbulb } from "lucide-react";

const munData = {
  "1": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "45,678",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "40221",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "24",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "15,234",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "156",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,310",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  }
}

const wardData = {
  "1": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "4378",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "56000",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "12",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "10,000",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "11",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "20",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "10",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,39",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "2": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "6578",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "100,900",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "11",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "11,020",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "19",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "40",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "18",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "1,132",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "3": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "1478",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "32,300",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "11",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "10,020",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "10",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "44",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "1",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "1,332",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "4": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3478",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "38,500",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "6",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "9,020",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "19",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "10",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "21",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "332",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "5": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3453",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "48,600",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "4",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "1,020",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "11",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "1,342",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "6": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "844",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "19,999",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "14",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "1,220",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "19",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "12",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "8,242",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "7": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "1432",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "18,000",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "8",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "3,220",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "29",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "14",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "8,232",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "8": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "6782",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "22,320",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "12",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "3,320",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "8",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "34",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "3,232",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "9": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "2121",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "23,530",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "15",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "4,320",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "13",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "43",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "3,233",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "10": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3333",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "12,300",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "7",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "4,322",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "23",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "19",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "9,233",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "11": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3171",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "23,900",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "10",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "4,332",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "30",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "29",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "3,333",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "12": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "4833",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "58,000",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "19",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "4,332",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "17",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "2",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "3",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "4,443",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "13": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3332",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "45,900",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "47",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "4,432",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "10",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "22",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "2",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,443",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "14": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "4990",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "28,990",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "13",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "8,432",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "20",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "33",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "10",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "15": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "1234",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "53, 600",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "12",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "7,433",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "43",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "1",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "16": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "423",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "58,000",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "16",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "7,433",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "63",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "13",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "17": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "1123",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "58,900",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "20",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "1,433",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "11",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "23",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "18": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "3422",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "58,900",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "15",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "11,433",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "156",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "7",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },
  "19": {
    cards: [
      {
        title: "Population and People",
        subtitle: "Total Population",
        value: "5321",
        icon: Users,
        source: {
          name: "Census Bureau",
          link: "https://census.gov"
        }
      },
      {
        title: "Economy",
        subtitle: "Average Household Income",
        value: "33000",
        icon: Briefcase,
        source: {
          name: "Economic Survey",
          link: "https://economics.gov"
        }
      },
      {
        title: "Healthcare",
        subtitle: "Healthcare Facilities",
        value: "12",
        icon: HeartPulse,
        source: {
          name: "Health Department",
          link: "https://health.gov"
        }
      },
      {
        title: "Education",
        subtitle: "Schools and Colleges",
        value: "16",
        icon: GraduationCap,
        source: {
          name: "Education Department",
          link: "https://education.gov"
        }
      },
      {
        title: "Housing",
        subtitle: "Residential Units",
        value: "11,444",
        icon: Home,
        source: {
          name: "Housing Authority",
          link: "https://housing.gov"
        }
      },
      {
        title: "Transportation",
        subtitle: "Public Transit Stops",
        value: "9",
        icon: Bus,
        source: {
          name: "Transit Authority",
          link: "https://transit.gov"
        }
      },
      {
        title: "Environment",
        subtitle: "Green Spaces (acres)",
        value: "156",
        icon: Trees,
        source: {
          name: "Environmental Department",
          link: "https://environment.gov"
        }
      },
      {
        title: "Safety",
        subtitle: "Police Stations",
        value: "8",
        icon: Shield,
        source: {
          name: "Police Department",
          link: "https://police.gov"
        }
      },
      {
        title: "Infrastructure",
        subtitle: "Street Lights",
        value: "2,345",
        icon: Lightbulb,
        source: {
          name: "Infrastructure Department",
          link: "https://infrastructure.gov"
        }
      }
    ]
  },

  // Add similar data structure for wards 2-19
};

const InfoCard = ({ title, subtitle, value, icon: Icon, source }) => {
  console.log('icon', Icon)
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {Icon && <Icon className="h-6 w-6 text-gray-700" />}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
      <div className="text-xs text-blue-500">
        <a 
          href={source.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Source: {source.name}
        </a>
      </div>
    </div>
  );
};

// InfoPanel Component
const InfoPanel = ({ wardNumber }) => {
  const wardInfo = wardNumber=== "municipal" ? munData['1'] : wardData[`${wardNumber.wards}`];
  
  if (wardNumber==="municipal") return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Municipal Level - General Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wardInfo.cards.map((card, index) => (
        <InfoCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          value={card.value}
          icon={card.icon}
          source={card.source}
        />
      ))}
    </div>
  </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 mb-4">Ward {wardNumber.wards} - General Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wardInfo.cards.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            icon={card.icon}
            source={card.source}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;
