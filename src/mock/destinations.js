import { getRandomDescriptionPhoto } from '../utils';

export const destinations = [
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: 'Tokio, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokio',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Tokio parliament building'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Tokio parliament building'
      },
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: 'Seoul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Seoul',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Seoul parliament building'
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: '',
    name: 'Busan',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Busan parliament building'
      }
    ]
  },
];
