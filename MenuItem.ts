export const COURSES = ['starter', 'main', 'dessert'] as const;

export type Course = (typeof COURSES)[number];

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
  imageUrl?: string; 
}