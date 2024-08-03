import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';
import { removeFromHistory } from '../lib/userData'; 
import styles from '../styles/History.module.css';

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory) return null;

  const parsedHistory = searchHistory.map(h => {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    return Object.fromEntries(entries);
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    const query = searchHistory[index];
    router.push(`/artwork?${query}`);
  };

  const removeHistoryClicked = async (e, index) => { 
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index])); 
  };

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Title>Search History</Card.Title>
            <Card.Text>Your search history is empty. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
        ) : (
              <ListGroup>
                {parsedHistory.map((historyItem, index) => (
                  <ListGroup.Item
                    key={index}
                    className={styles.historyListItem}
                    onClick={(e) => historyClicked(e, index)}
                  >
                    {Object.keys(historyItem).map((key, i) => (
                      <span key={i}>
                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                      </span>
                    ))}
                    <Button
                      className="float-end"
                      variant="danger"
                      size="sm"
                      onClick={(e) => removeHistoryClicked(e, index)}
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )
      }
    </>
  );
}
