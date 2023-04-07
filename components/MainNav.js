import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavDropdown } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    if (searchField == "") {
      setSearchField("");
    } else {
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
      router.push(`/artwork?title=true&q=${searchField}`);
      setIsExpanded(false);
      setSearchField("");
    }
  }

  return (
    <div>
      <Navbar id="navb" className="fixed-top" aria-expanded={isExpanded}>
        <Container>
          <Navbar.Brand style={{ color: "white" }}>Meetsimar Kaur</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            aria-expanded={!isExpanded}
            onClick={() => setIsExpanded(!isExpanded)} // executing the function
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => setIsExpanded(false)} // defining the function
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              </Link>}
              {token && <Link href="/inspire" passHref legacyBehavior>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/inspire"}
                >
                  Surprise
                </Nav.Link>
              </Link>}
            </Nav>
            {!token &&
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => setIsExpanded(false)} // defining the function
                  active={router.pathname === "/"}
                >
                  Register
                </Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/search"}
                >
                  Login
                </Nav.Link>
              </Link>
              </Nav>
            }
            &nbsp;
            {token && <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                value={searchField}
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchField(e.target.value)}
              />
              &nbsp;
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>}
            &nbsp;
            {token && 
            <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites">
                  <NavDropdown.Item
                    href="/favourites"
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/favourites"}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history">
                  <NavDropdown.Item
                    href="/history"
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <Link href="/history">
                  <NavDropdown.Item
                    onClick={() => logout()}
                  >
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </div>
  );
}
