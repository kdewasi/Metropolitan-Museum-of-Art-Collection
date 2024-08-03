import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCardDetail from '../components/ArtworkCardDetail'; 

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>List of Favourite Artworks</Card.Title>
              <Card.Text>Nothing in the list yet! Try adding some artworks.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="gy-4">
      {favouritesList.map(objectID => (
        <Col key={objectID} sm={6} md={4} lg={3}>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      ))}
    </Row>
  );
}
