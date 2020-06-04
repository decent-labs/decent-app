import React from "react";
import {Col, Row} from "react-bootstrap";
import ListTable from "./listTable";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import Alert from "react-bootstrap/Alert";

function SearchResults({alert}) {
  const results = useAsyncState(StateProperty.search);

  return(
    <>
      <Row>
        <Col>
          <h1>Search Results</h1>
        </Col>
      </Row>
      {(results.data.length > 0) ?
        <ListTable patients={results.data} /> :
        <Alert
          className='mt-3'
          variant='warning'
        >
          No results found
        </Alert>
      }
    </>
  )
}

export default SearchResults;
