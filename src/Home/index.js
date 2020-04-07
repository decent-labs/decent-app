import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Left from './Left';
import Top from './Top';
import Main from './Main';

function Home() {
  

  return (
    <Container fluid className='h-100 main-container'>
      <Row className='h-100'>
        <Col xs={4} md={3} lg={2} className='py-5 shadow bg-light d-flex flex-column'>
          <Left />
        </Col>
        <Col xs={8} md={9} lg={10} className='py-4'>
          <Top />
          <Main />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
