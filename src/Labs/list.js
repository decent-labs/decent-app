import React, { useEffect, useCallback, useState} from "react";
import { useDispatch } from 'react-redux';
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {dataSetAction} from "../redux/reducers/async";
import {request} from "../requests";
import ListTable from "./listTable";
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'qs';
import isEmpty from 'lodash.isempty';
export default function LabList() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history  = useHistory();
  const { currentPage: qsCurrentPage } = queryString.parse(location.search.slice(1));
  const [currentPage, setCurrentPageState ] = useState(null);
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
	if (currentPage === null)
	    return { labs: [] };

	request(`labOrgs?currentPage=${currentPage}&perPage=10`, 'GET').then(response => {
	    setPaginationData(response.labs.pagination);
	    dispatch(dataSetAction(StateProperty.labs,response));
	    return response;
	})
    }, [currentPage, dispatch]);

  const lastPage = parseInt(paginationData.lastPage);
  const pdCurrentPage = parseInt(paginationData.currentPage);

  const state = useAsyncState(
      StateProperty.labs,
      labsLoader,
      [currentPage,
       userProfiles.data.currentProfile
      ]);

  return(
    <>
      <Row>
        <Col>
          <h1>Laboratories</h1>
        </Col>
      </Row>
      <ListTable labs={state.data.labs.data || []}></ListTable>
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
