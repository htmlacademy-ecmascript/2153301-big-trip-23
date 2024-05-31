import { getRandomDescriptionPhoto } from '../utils/task';

export const mockDestinations = [
  {
    id: '1',
    description: 'Tokio, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokio',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Tokio parliament building',
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Tokio parliament building',
      },
    ],
  },
  {
    id: '2',
    description: 'Seoul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Seoul',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Seoul parliament building',
      },
    ],
  },
  {
    id: '3',
    description: '',
    name: 'Busan',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Busan parliament building',
      },
    ],
  },
];
