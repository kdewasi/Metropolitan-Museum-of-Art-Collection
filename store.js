import { atom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/userData';

export const favouritesAtom = atom(getFavourites());
export const searchHistoryAtom = atom(getHistory());