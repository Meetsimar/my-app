import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function favourites() {

  const [favouriteList, setFavouriteList] = useAtom(favouritesAtom)

  if (!favouriteList) 
  return null;

  return (
    <div>
    {favouriteList ? (
      <>
        <Row className="gy-4">
          {favouriteList.length > 0 ? (
            favouriteList.map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <h4 style={{ color: "white", textAlign: "center" }}>
              Nothing Here. Try searching for something else.
            </h4>
          )}
        </Row>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}
