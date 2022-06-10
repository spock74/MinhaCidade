export const Images = [
  {image: require('../assets/banners/vazamento.jpeg')},
  {image: require('../assets/banners/vazamento-2.jpeg')},
  {image: require('../assets/banners/vazamento-5.webp')},
  {image: require('../assets/banners/vazamento-3.jpeg')},
  {image: require('../assets/banners/vazamento-4.jpeg')},
];

export const markers = [
  {
    coordinate: {
      latitude: -20.745646384023,
      longitude: -42.88733714762861,
    },
    title: 'Vazamento na rua',
    description: '... algum detalhe sobre o local',
    image: Images[4].image,
    rating: 3,
    reviews: 99,
  },
  // {
  //   coordinate: {
  //     latitude: -20.751111444678376,
  //     longitude: -42.86684589086509,
  //   },
  //   title: 'Foco de Dengue',
  //   description: '... algum detalhe sobre o local',
  //   image: Images[1].image,
  //   rating: 5,
  //   reviews: 102,
  // },
  // {
  //   coordinate: {
  //     latitude: -20.75379081623074,
  //     longitude: -42.887831517166035,
  //   },
  //   title: 'Uma anotação Sobre um Local',
  //   description: '... algum detalhe sobre o local',
  //   image: Images[2].image,
  //   rating: 3,
  //   reviews: 220,
  // },
  // {
  //   coordinate: {
  //     latitude: -20.763050885254362,
  //     longitude: -42.8818544663478,
  //   },
  //   title: 'Uma anotação Sobre um Local',
  //   description: '... algum detalhe sobre o local',
  //   image: Images[3].image,
  //   rating: 4,
  //   reviews: 48,
  // },
  // {
  //   coordinate: {
  //     latitude: -20.764473874525567,
  //     longitude: -42.88840496115598,
  //   },
  //   title: 'Uma anotação Sobre um Local',
  //   description: '... algum detalhe sobre o local',
  //   image: Images[4].image,
  //   rating: 4,
  //   reviews: 178,
  //  },
];

export const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
