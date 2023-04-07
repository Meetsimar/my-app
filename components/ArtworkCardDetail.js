import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useState,useEffect } from "react";

export default function ArtworkCardDetail(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(props.objectID))
   }, [favouritesList]
  )

  async function favouritesClicked() {

    if (showAdded == true) {
      setFavouritesList(await removeFromFavourites(props.objectID))
      setShowAdded(false)
    } else {
      setFavouritesList(await addToFavourites(props.objectID))
      setShowAdded(true)
    }
  }

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );

  if (error) {
    <Error statusCode={404} />;
  }
  if (!data) return null;
  if (data) {
    const {
      primaryImage,
      title,
      objectDate,
      classification,
      medium,
      artistDisplayName,
      creditLine,
      dimensions,
      artistWikidata_URL,
    } = data;

    return (
      <Card>
        {primaryImage && <Card.Img variant="top" src={primaryImage} />}
        {!primaryImage && (
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          />
        )}
        <Card.Body className="card-text">
          <Card.Title>{title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {objectDate || "N/A"}
            <br />
            <strong>Classification:</strong> {classification || "N/A"}
            <br />
            <strong>Medium:</strong> {medium || "N/A"}
            <br />
            <br />
            <strong>Artist: </strong>
            {artistDisplayName ? (
              <>
                {artistDisplayName} ({" "}
                {artistWikidata_URL && (
                  <u>
                    <a
                      href={artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                  </u>
                )}{" "}
                )
              </>
            ) : (
              "N/A"
            )}
            <br />
            <strong>Credit Line:</strong> {creditLine || "N/A"}
            <br />
            <strong>Dimensions:</strong> {dimensions || "N/A"}<br /><br />
            {showAdded == true ? (
              <Button variant="dark" onClick={favouritesClicked}>
                + Favourite (added)
              </Button>
            ) : (
              <Button variant="outline-dark" onClick={favouritesClicked}>
                + Favourite
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
