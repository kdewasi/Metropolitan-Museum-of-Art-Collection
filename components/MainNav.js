import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react'; 
import { useAtom } from 'jotai'; 
import { searchHistoryAtom } from '../store'; 
import { addToHistory } from '../lib/userData'; 
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 
  const token = readToken();

  const handleSearchSubmit = async (e) => { 
    e.preventDefault();
    const searchField = e.target.search.value;
    if(searchField.trim() !== '') { 
      setSearchHistory(await addToHistory(`title=true&q=${encodeURIComponent(searchField)}`)); 
      router.push(`/artwork?title=true&q=${encodeURIComponent(searchField)}`); 
    }
    setIsExpanded(false); 
  };

  const collapseNavbar = () => setIsExpanded(false);

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  };

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary" onToggle={() => setIsExpanded(!isExpanded)}>
        <Container>
          <Navbar.Brand>Kishan Dewasi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior><Nav.Link onClick={collapseNavbar} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
              )}
            </Nav>
            {token && (
              <Form onSubmit={handleSearchSubmit} className="d-flex">
                <FormControl type="text" placeholder="Search" className="me-2" name="search" />
                <Button type="submit" variant="outline-success">Search</Button>
              </Form>
            )}
            <Nav data-bs-theme="dark">
              {token ? (
                <NavDropdown title={token.userName} id="nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                  </Link>
                  
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/register" passHref legacyBehavior><Nav.Link onClick={collapseNavbar} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                  <Link href="/login" passHref legacyBehavior><Nav.Link onClick={collapseNavbar} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}