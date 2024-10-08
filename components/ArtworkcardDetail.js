import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { favouritesAtom } from '@/store';

import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '../lib/userData'; 

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        await removeFromFavourites(objectID);
        setFavouritesList(current => current.filter(fav => fav !== objectID));
        setShowAdded(false);
      } else {
        await addToFavourites(objectID);
        setFavouritesList(current => [...current, objectID]);
        setShowAdded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title><strong>{title || "N/A"}</strong></Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {classification || "N/A"}
          {medium && (
            <>
              <br />
              <strong>Medium:</strong> {medium}<br />
              <br />
            </>
          )}
          {artistDisplayName && (
            <>
              <div><strong>Artist: </strong> {artistDisplayName} ( <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> )</div>
            </>
          )}
          {!artistDisplayName && (
            <>
              <strong>Artist:</strong> N/A<br />
            </>
          )}
          <strong>Credit Line:</strong> {creditLine || "N/A"}
          <br />
          <strong>Dimensions:</strong> {dimensions || "N/A"}
        </Card.Text>
        
        <Button 
          variant={showAdded ? "primary" : "outline-primary"} 
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite ( added )" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
