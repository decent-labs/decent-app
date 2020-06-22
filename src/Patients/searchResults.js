import React, { useEffect } from "react";
import {Col, Row} from "react-bootstrap";
import ListTable from "./listTable";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import Alert from "react-bootstrap/Alert";
import { useLocation } from 'react-router-dom';
import { getPrescriptionData } from "../redux/reducers/async/prescription";
import { useDispatch } from 'react-redux';
import { request } from '../requests';
import isEmpty from 'lodash.isempty';
import queryString from 'qs';
import {
  dataLoadingAction,
  dataLoadingErrorAction,
  dataSetAction
} from "../redux/reducers/async";

function SearchResults({alert}) {
  const dispatch = useDispatch();
  const results = useAsyncState(StateProperty.search);
  const { search } = useLocation();

  useEffect( () => {

      const { fname, lname, dob: searchDob } = queryString.parse(search.slice(1));

      const shouldDispatch = [lname, fname, searchDob].filter(x => !isEmpty(x)).length > 0;
      if (shouldDispatch) {
	      dispatch(dataLoadingAction(StateProperty.search));
        const query = queryString.stringify({ lname, fname, dob: searchDob });
        request(`patients?${query}`)
        .then(results => {
          const profiles = results.profile.map(curProfile =>
            request(`patients/${curProfile.id}/profile`)
          )
          getPrescriptionData(profiles)
          .then(response => {
            dispatch(dataSetAction(StateProperty.search, response));
          })
          .catch(error => {
            dispatch(dataLoadingErrorAction(StateProperty.search, error));
          })
        });
      }

      return () => dispatch(dataSetAction(StateProperty.search, []));
  }, [ dispatch, search ]);

  const Data = () => results.isLoading ? <Loading /> : <DoneLoading />
  const Loading = () => <div><h4>Loading search results</h4></div>
  const DoneLoading = () => (results.data.length > 0) ? <ListTable patients={results.data} /> : <NoResults />
  const NoResults = () => <Alert className='mt-3' variant='warning'>No results found</Alert>

  return (
    <>
      <Row>
        <Col>
          <h1>Search Results</h1>
        </Col>
      </Row>
      <Data />
    </>
  )
}

export default SearchResults;
