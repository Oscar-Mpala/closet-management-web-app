import { ClothingItem, Outfit } from './types';

import { CalendarEvent } from './types';

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Grey Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 15,
    images: [
      '/closet/tops/1.webp',
      '/closet/tops/1.1.webp'
    ],
    colorHex: '#808080',
    description: 'A solid neutral base. Great for tone-on-tone outfits.',
    size: 'M',
    season: ['All'],
    fitProfile: 'Regular'
  },
  {
    id: '2',
    name: 'Black Polo',
    category: 'Tops',
    status: 'dirty',
    wearCount: 22,
    images: [
      '/closet/tops/2.webp',
      '/closet/tops/2.1.webp'
    ],
    colorHex: '#000000',
    description: 'Sleek and understated. Pairs well with fitted cargos or denim.',
    size: 'M',
    season: ['All'],
    fitProfile: 'Regular'
  },
  {
    id: '3',
    name: 'Navy Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 18,
    images: [
      '/closet/tops/3.webp',
      '/closet/tops/3.1.webp'
    ],
    colorHex: '#000080',
    description: 'The core of the Charles lineage. Sharp and professional.',
    size: 'M',
    season: ['All'],
    fitProfile: 'Regular'
  },
  {
    id: '4',
    name: 'Powder Blue Heathered Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 8,
    images: [
      '/closet/tops/4.webp',
      '/closet/tops/4.1.webp'
    ],
    colorHex: '#B0E0E6',
    description: 'Soft, washed texture. Perfect for a bright contrast against dark pants.',
    size: 'M',
    season: ['Spring', 'Summer'],
    fitProfile: 'Regular'
  },
  {
    id: '5',
    name: 'Sage Green Polo',
    category: 'Tops',
    status: 'dirty',
    wearCount: 14,
    images: [
      '/closet/tops/5.webp',
      '/closet/tops/5.1.webp'
    ],
    colorHex: '#98FB98',
    description: 'Light mint shade. Gives an elevated, earthy vibe.',
    size: 'M',
    season: ['Spring', 'Summer'],
    fitProfile: 'Regular'
  },
  {
    id: '6',
    name: 'Olive Topography Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 10,
    images: [
      '/closet/tops/6.webp',
      '/closet/tops/6.1.webp'
    ],
    colorHex: '#808000',
    description: 'Muted sage with dark contour lines. Unique print for rugged outfits.',
    size: 'M',
    season: ['Fall', 'All'],
    fitProfile: 'Regular'
  },
  {
    id: '7',
    name: 'Pastel Yellow Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 5,
    images: [
      '/closet/tops/7.webp',
      '/closet/tops/7.1.webp'
    ],
    colorHex: '#FFFACD',
    description: 'Solid pale yellow for a bright pop of color on campus.',
    size: 'M',
    season: ['Spring', 'Summer'],
    fitProfile: 'Regular'
  },
  {
    id: '8',
    name: 'White Pencil Stripe Polo',
    category: 'Tops',
    status: 'dirty',
    wearCount: 11,
    images: [
      '/closet/tops/8.webp',
      '/closet/tops/8.1.webp'
    ],
    colorHex: '#FFFFFF',
    description: 'Very thin dark grey stripes. Adds subtle texture to a monochrome look.',
    size: 'M',
    season: ['All'],
    fitProfile: 'Regular'
  },
  {
    id: '9',
    name: 'White & Baby Blue Striped Polo',
    category: 'Tops',
    status: 'clean',
    wearCount: 16,
    images: [
      '/closet/tops/9.webp',
      '/closet/tops/9.1.webp'
    ],
    colorHex: '#89CFF0',
    description: 'Alternating solid white and micro-striped blue bands.',
    size: 'M',
    season: ['Spring', 'Summer'],
    fitProfile: 'Regular'
  },
  {
    id: '10',
    name: 'Solid White Tee',
    category: 'Tops',
    status: 'clean',
    wearCount: 30,
    images: [
      '/closet/tops/10.webp',
      '/closet/tops/10.1.webp'
    ],
    colorHex: '#FFFFFF',
    description: 'The ultimate baseline shirt. Comfortable and endlessly versatile.',
    size: 'L',
    season: ['All'],
    fitProfile: 'Oversized'
  },
  {
    id: '11',
    name: 'Washed Blue Tee',
    category: 'Tops',
    status: 'dirty',
    wearCount: 20,
    images: [
      '/closet/tops/11.webp',
      '/closet/tops/11.1.webp'
    ],
    colorHex: '#5F9EA0',
    description: 'Relaxed vintage vibe for easy-going lecture days.',
    size: 'L',
    season: ['All'],
    fitProfile: 'Oversized'
  },
  {
    id: '12',
    name: 'Light Pink Tee',
    category: 'Tops',
    status: 'clean',
    wearCount: 12,
    images: [
      '/closet/tops/12.webp',
      '/closet/tops/12.1.webp'
    ],
    colorHex: '#FFB6C1',
    description: 'Perfect match for the Jordan 1s.',
    size: 'L',
    season: ['Spring', 'Summer'],
    fitProfile: 'Oversized'
  },
  {
    id: '13',
    name: 'White Graphic Line Tee',
    category: 'Tops',
    status: 'clean',
    wearCount: 9,
    images: [
      '/closet/tops/13.webp',
      '/closet/tops/13.1.webp'
    ],
    colorHex: '#FFFFFF',
    description: 'White base with blue & green lines. Good visual interest without being loud.',
    size: 'L',
    season: ['All'],
    fitProfile: 'Oversized'
  },
  {
    id: '14',
    name: 'Black Cargo Jean',
    category: 'Bottoms',
    status: 'dirty',
    wearCount: 45,
    images: [
      '/closet/bottoms/14.webp',
      '/closet/bottoms/14.1.webp'
    ],
    colorHex: '#1A1A1A',
    description: 'Heavy duty and highly reliable base.',
    size: '32',
    season: ['Fall', 'Winter', 'All'],
    fitProfile: 'Baggy'
  },
  {
    id: '15',
    name: 'Deep Blue Carpenter Jean',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 38,
    images: [
      '/closet/bottoms/15.webp',
      '/closet/bottoms/15.1.webp'
    ],
    colorHex: '#00008B',
    description: 'Durable denim with a comfortable, wide drape.',
    size: '32',
    season: ['All'],
    fitProfile: 'Loose'
  },
  {
    id: '16',
    name: 'Light Blue Faded Jean',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 15,
    images: [
      '/closet/bottoms/16.webp',
      '/closet/bottoms/16.1.webp'
    ],
    colorHex: '#ADD8E6',
    description: 'Slimmer cut. Best balanced with oversized tees.',
    size: '32',
    season: ['All'],
    fitProfile: 'Fitted'
  },
  {
    id: '17',
    name: 'Solid Black Jean',
    category: 'Bottoms',
    status: 'dirty',
    wearCount: 28,
    images: [
      '/closet/bottoms/17.webp',
      '/closet/bottoms/17.1.webp'
    ],
    colorHex: '#000000',
    description: 'Standard black denim. Streamlined and simple.',
    size: '32',
    season: ['All'],
    fitProfile: 'Fitted'
  },
  {
    id: '18',
    name: 'Khaki Cargo',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 22,
    images: [
      '/closet/bottoms/18.webp',
      '/closet/bottoms/18.1.webp'
    ],
    colorHex: '#C3B091',
    description: 'Earthy slim cargo. Pairs well with the black polo.',
    size: '32',
    season: ['All'],
    fitProfile: 'Fitted'
  },
  {
    id: '19',
    name: 'Dark Grey Cargo',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 19,
    images: [
      '/closet/bottoms/19.webp',
      '/closet/bottoms/19.1.webp'
    ],
    colorHex: '#A9A9A9',
    description: 'Fitted grey utility pants.',
    size: '32',
    season: ['All'],
    fitProfile: 'Fitted'
  },
  {
    id: '20',
    name: 'Black Parachute Cargo',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 31,
    images: [
      '/closet/bottoms/20.webp',
      '/closet/bottoms/20.1.webp'
    ],
    colorHex: '#111111',
    description: 'Extremely comfortable, lightweight tech material.',
    size: '32',
    season: ['Spring', 'Summer', 'All'],
    fitProfile: 'Loose'
  },
  {
    id: '21',
    name: 'Light Grey Jeans',
    category: 'Bottoms',
    status: 'clean',
    wearCount: 25,
    images: [
      '/closet/bottoms/21.webp',
      '/closet/bottoms/21.1.webp'
    ],
    colorHex: '#D3D3D3',
    description: 'Borderline white. The ultimate smart-casual cheat code.',
    size: '32',
    season: ['Spring', 'Summer', 'All'],
    fitProfile: 'Loose'
  },
  {
    id: '22',
    name: 'Grey Air Force 1',
    category: 'Footwear',
    status: 'dirty',
    wearCount: 50,
    images: [
      '/closet/shoes/22.webp',
      '/closet/shoes/22.1.webp'
    ],
    colorHex: '#808080',
    description: 'Chunky silhouette to balance baggy pants.',
    size: '10',
    season: ['All'],
    fitProfile: 'Chunky'
  },
  {
    id: '23',
    name: 'White Air Force 1',
    category: 'Footwear',
    status: 'clean',
    wearCount: 40,
    images: [
      '/closet/shoes/23.webp',
      '/closet/shoes/23.1.webp'
    ],
    colorHex: '#FFFFFF',
    description: 'Classic white with a grey tick. Goes with literally everything.',
    size: '10',
    season: ['All'],
    fitProfile: 'Chunky'
  },
  {
    id: '24',
    name: 'Jordan 1 Low Black & Pink',
    category: 'Footwear',
    status: 'clean',
    wearCount: 18,
    images: [
      '/closet/shoes/24.webp',
      '/closet/shoes/24.1.webp'
    ],
    colorHex: '#000000',
    description: 'Mostly black with powder pink accents. Great for coordinated fits.',
    size: '10',
    season: ['All'],
    fitProfile: 'Standard'
  },
  {
    id: '25',
    name: 'White Puma Caven',
    category: 'Footwear',
    status: 'clean',
    wearCount: 27,
    images: [
      '/closet/shoes/25.webp',
      '/closet/shoes/25.1.webp'
    ],
    colorHex: '#FFFFFF',
    description: 'Okay size, clean white profile. Slightly sleeker than the AF1s.',
    size: '10',
    season: ['All'],
    fitProfile: 'Standard'
  }
];

export const mockOutfitOfDay: Outfit = {
  id: 'o1',
  name: 'Charles I',
  rating: 5,
  itemIds: ['3', '21', '23'],
  outfitImageUrl: '/closet/outfits/CharlesI.webp',
  topId: '3',
  bottomId: '21',
  footwearId: '23'
};

export const mockOutfits: Outfit[] = [
  mockOutfitOfDay,
  {
    id: 'o2',
    name: 'Charles II',
    rating: 4,
    itemIds: ['3', '21', '25'],
    outfitImageUrl: '/closet/outfits/CharlesII.webp',
    topId: '3',
    bottomId: '21',
    footwearId: '25'
  },
  {
    id: 'o3',
    name: 'Charles IV',
    rating: 4,
    itemIds: ['3', '14', '22'],
    outfitImageUrl: '/closet/outfits/CharlesI.webp',
    topId: '3',
    bottomId: '14',
    footwearId: '22'
  },
  {
    id: 'o4',
    name: 'Arthur I',
    rating: 5,
    itemIds: ['4', '14', '25'],
    outfitImageUrl: '/closet/outfits/ArthurI.webp',
    topId: '4',
    bottomId: '14',
    footwearId: '25'
  },
  {
    id: 'o6',
    name: 'Arthur II',
    rating: 5,
    itemIds: ['4', '21', '23'],
    outfitImageUrl: '/closet/outfits/ArthurII.webp',
    topId: '4',
    bottomId: '21',
    footwearId: '23'
  },
  {
    id: 'o7',
    name: 'Edward I',
    rating: 5,
    itemIds: ['5', '21', '25'],
    outfitImageUrl: '/closet/outfits/EdwardI.webp',
    topId: '5',
    bottomId: '21',
    footwearId: '25'
  },
  {
    id: 'o8',
    name: 'Edward II',
    rating: 4,
    itemIds: ['5', '21', '23'],
    outfitImageUrl: '/closet/outfits/EdwardII.webp',
    topId: '5',
    bottomId: '21',
    footwearId: '23'
  },
  {
    id: 'o9',
    name: 'Edward III',
    rating: 4,
    itemIds: ['5', '15', '25'],
    outfitImageUrl: '/closet/outfits/EdwardIII.webp',
    topId: '5',
    bottomId: '15',
    footwearId: '25'
  },
  {
    id: 'o10',
    name: 'Henry II',
    rating: 5,
    itemIds: ['7', '21', '25'],
    outfitImageUrl: '/closet/outfits/HenryII.webp',
    topId: '7',
    bottomId: '21',
    footwearId: '25'
  },
  {
    id: 'o11',
    name: 'Henry I',
    rating: 4,
    itemIds: ['7', '21', '23'],
    outfitImageUrl: '/closet/outfits/HenryI.webp',
    topId: '7',
    bottomId: '21',
    footwearId: '23'
  },
  {
    id: 'o12',
    name: 'Henry III',
    rating: 3,
    itemIds: ['7', '15', '25'],
    outfitImageUrl: '/closet/outfits/HenryIII.webp',
    topId: '7',
    bottomId: '15',
    footwearId: '25'
  },
  {
    id: 'o13',
    name: 'Richard I',
    rating: 5,
    itemIds: ['9', '14', '22'],
    outfitImageUrl: '/closet/outfits/RichardI.webp',
    topId: '9',
    bottomId: '14',
    footwearId: '22'
  },
  {
    id: 'o14',
    name: 'Richard II',
    rating: 4,
    itemIds: ['8', '14', '23'],
    outfitImageUrl: '/closet/outfits/RichardII.webp',
    topId: '8',
    bottomId: '14',
    footwearId: '23'
  },
  {
    id: 'o15',
    name: 'Richard III',
    rating: 4,
    itemIds: ['8', '21', '23'],
    outfitImageUrl: '/closet/outfits/RichardIII.webp',
    topId: '8',
    bottomId: '21',
    footwearId: '23'
  },
  {
    id: 'o17',
    name: 'Winston I',
    rating: 5,
    itemIds: ['6', '15', '22'],
    outfitImageUrl: '/closet/outfits/WinstonI.webp',
    topId: '6',
    bottomId: '15',
    footwearId: '22'
  }
];

export const mockEvents: CalendarEvent[] = [
  {
    id: 'event_1',
    date: new Date().toISOString().split('T')[0], 
    outfitId: mockOutfits[0]?.id || '', // Pulls your first Charles/Arthur outfit
  }
];