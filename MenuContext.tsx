import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from './MenuItem';

const initialMenu: MenuItem[] = [
  {
    id: '1',
    dishName: 'Classic Caesar',
    description: 'Romaine, croutons, parmesan',
    course: 'starter',
    price: 85,
    imageUrl: 'https://media.istockphoto.com/id/1337799015/photo/caesar-salad.jpg?s=1024x1024&w=is&k=20&c=364iX7jWcaL4p_zS1nCuO5wlMG2s74O30bierR-K6kI=',
  },
  {
    id: '2',
    dishName: 'Ribeye Steak',
    description: 'Grilled with garlic butter',
    course: 'main',
    price: 245.5,
    imageUrl: 'https://media.istockphoto.com/id/1138471335/photo/grilled-beef-steaks-with-spices.jpg?s=1024x1024&w=is&k=20&c=ZU6UAyheNftqXKhrs4N4GjiW0rU1sDXu5fImAbKOmEk=',
  },
  {
    id: '3',
    dishName: 'Chocolate Lava',
    description: 'Warm molten cake',
    course: 'dessert',
    price: 95,
    imageUrl: 'https://media.istockphoto.com/id/544716244/photo/warm-chocolate-lava-cake-with-molten-center-and-red-currants.jpg?s=1024x1024&w=is&k=20&c=_QmqhSe_oFa2H0t1EiTfHOa2EmHGDZClDR_MWrYTgHw=',
  },
];

const MenuContext = createContext<{
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
} | null>(null);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),

      imageUrl: item.imageUrl && item.imageUrl.trim() !== '' ? item.imageUrl.trim() : undefined,
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('useMenu must be used inside MenuProvider');
  }
  return ctx;
};