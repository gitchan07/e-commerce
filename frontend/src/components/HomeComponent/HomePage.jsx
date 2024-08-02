import React from 'react';
import ListCardCategory from './ListCardComponent';

const HomePage = () => {
  const categories = [
    {
      title: 'Liquid',
      description: 'Find the flavour that you love with our liquid products.',
      imageUrl: 'https://source.unsplash.com/random/800x600?vape-liquid',
    },
    {
      title: 'Device',
      description: 'Choose the device that best fits your taste.',
      imageUrl: 'https://www.flaticon.com/free-icon/vaping_2562072?term=vape&page=1&position=62&origin=tag&related_id=2562072',
    },
    {
      title: 'Accessories',
      description: 'You can find all your favorite accessories here.',
      imageUrl: 'https://www.flaticon.com/free-icon/vape_6816119?term=vape&page=2&position=78&origin=tag&related_id=6816119.png',
    },
    {
        title: 'Battery',
        description: 'Find the battery that best fits your device.',
        imageUrl: 'https://www.flaticon.com/free-icon/vape_6816119?term=vape&page=2&position=78&origin=tag&related_id=6816119.png',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to Our Store</h1>
      <ListCardCategory categories={categories} />
    </div>
  );
};

export default HomePage;
