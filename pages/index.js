/*********************************************************************************
* BTI425 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Meetsimar Kaur Student ID: 106510217 Date: 7th April 2023
*
*
********************************************************************************/ 

import { Image, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Row>
        <Col>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded alt="View of the Metropolitan Museum of Art from Central Park, New York City"/>
        </Col>
      </Row>
      <div style={{backgroundColor: "rgba(0, 0, 0, 0.4)", padding: "8px"}}>
        <Row className="mt-4">
          <Col md={6}>
            <p>The Metropolitan Museum of Art, colloquially &lsquo;the Met&rsquo;, is located in New York City and is the largest art 
              museum in the United States. Its permanent collection contains over two million works, divided among seventeen 
              curatorial departments. The main building, on the eastern edge of Central Park along Museum Mile, is by area 
              one of the world&rsquo;s largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park 
              in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts 
              from medieval Europe.
              <br/><br/>
              The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the 
              American people. The museum&rsquo;s permanent collection consists of works of art from classical antiquity and 
              ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive 
              collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, 
              Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments,
              costumes, and accessories, as well as antique weapons and armor from around the world. Several notable 
              interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
            </p>
          </Col>
          <Col md={6}>
            <p>The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic
              in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of
              most-visited art museums in the world.
            </p>
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer" style={{color: "white"}}>https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>
        </Col>
      </Row></div>
    </div>
  );
}
