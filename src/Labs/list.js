import React, { useEffect, useCallback, useState} from "react";
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import ListTable from "./listTable";
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'qs';
import isEmpty from 'lodash.isempty';
export default function LabList() {
  const location = useLocation();
  const history  = useHistory();
  const { currentPage: qsCurrentPage } = queryString.parse(location.search.slice(1));
  const [currentPage, setCurrentPageState ] = useState(1);
  const setCurrentPage = page => {
      setCurrentPageState(page);
      history.push(`/labs?currentPage=${page}`);
  };

  const [paginationData, setPaginationData] = useState({
      currentPage,
      from: 0,
      lastPage: 0,
      perPage: 0,
      to: 0,
      total: 0,
      disabled: true
  });
  const userProfiles = useAsyncState(StateProperty.userProfile);

  useEffect(() => {
      if (isEmpty(qsCurrentPage)) {
        setCurrentPageState(1);
        return;
      }
      setCurrentPageState(parseInt(qsCurrentPage));
  }, [ qsCurrentPage ]);

  const labsLoader = useCallback(async () => {
    return request(`labOrgs?currentPage=${currentPage}&perPage=10`, 'GET').then(response => {
      setPaginationData(response.labs.pagination);
      return response;
    })
  }, [currentPage]);

  const lastPage = parseInt(paginationData.lastPage);
  const pdCurrentPage = parseInt(paginationData.currentPage);

  const state = useAsyncState(
      StateProperty.labs,
      labsLoader);

  function getTable() {
    let table;
    if(state.data.labs.data && state.data.labs.data.length > 0)
      table = <ListTable labs={state.data.labs.data || []}></ListTable>
    else
      table = state.isLoading
    ? <div><h4>Loading labs list...</h4></div>
    : <div><h4>You have no labs yet</h4></div>

    return table;
  }

  return(
    <>
      <Row>
        <Col>
          <h1>Laboratories</h1>
        </Col>
      </Row>
      {getTable()}
      { !paginationData.disabled &&
        userProfiles.data.currentProfile.profileType === 'internal' && (
        <Pagination as={'Container'} className='justify-content-end'>
             { pdCurrentPage > 1 &&
              <Pagination.First onClick={() => setCurrentPage(1)}/>
	     }
             { pdCurrentPage > 1 &&
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>
	     }
             <Pagination.Item active>{currentPage}</Pagination.Item>
             { pdCurrentPage < lastPage &&
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
             }
        </Pagination>
      )}
    </>
  )
}
