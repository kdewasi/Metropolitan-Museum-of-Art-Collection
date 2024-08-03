import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';

const PUBLIC_PATHS = ['/register'];

export default function RouteGuard({ children }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const updateAtoms = async () => {
      setFavouritesList(await getFavourites());
      setSearchHistory(await getHistory());
    };

    updateAtoms();
  }, []);

  return <>{children}</>;
}
