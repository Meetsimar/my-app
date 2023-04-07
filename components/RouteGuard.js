import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { favouritesAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from '@/lib/authenticate';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const PUBLIC_PATHS = ['/register','/login' ,'/', '/_error'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [, setFavouriteList] = useAtom(favouritesAtom)
    const [, setSearchHistory] = useAtom(searchHistoryAtom)
    const [authorized, setAuthorized] = useState(false);

    async function updateAtoms(){
        setFavouriteList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    

    useEffect(() => {
        updateAtoms();
        // on initial load - run auth check
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);


      function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      }

    return (
      <>
        {authorized && props.children}
      </>
    )
  }