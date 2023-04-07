import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function ArtworkCard({objectID}) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    <Error statusCode={404} />;
  }
  if (!data) return null;
  if (data) {

    const {primaryImageSmall, title, objectDate, classification, medium} = data

    return (
        <Card style={{ width: '18rem' }} className="card-text">
          <Card.Img variant="top" src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}  />
          <Card.Body>
            <Card.Title>{title || "N/A"}</Card.Title>
            <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {classification || 'N/A'}<br />
                    <strong>Medium:</strong> {medium || 'N/A'}
            </Card.Text>
            <Link href={`/artwork/${objectID}`}><Button variant="outline-dark" type="submit">ID: {objectID}</Button></Link>
          </Card.Body>
        </Card>
      );
  }
}

