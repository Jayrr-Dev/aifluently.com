import type { Category } from "$lib/types";
export const category: Category[] = [
    { id: 1, name: 'Main' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Education' },
    { id: 4, name: 'Entertainment' },
    { id: 5, name: 'Technology' },
    { id: 6, name: 'Creative' },
    { id: 7, name: 'Lifestyle' }
];

export function catIdToCatName(catId: number) {
    return category.find(cat => cat.id === catId)?.name;
}