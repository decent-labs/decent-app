import React, { useCallback, useState} from "react";
import { useDispatch } from 'react-redux';
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {dataSetAction} from "../redux/reducers/async";
import {request} from "../requests";
import ListTable from "./listTable";

export default function LabList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showNextPage, setShowNextPage] = useState(false);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const labsLoader = useCallback(() =>
    request(`labOrgs?currentPage=${currentPage}`, 'GET').then(response => {
      request(`labOrgs?currentPage=${currentPage+1}`, 'GET')
        .then((response) => {
          setShowNextPage(response.labs.data.length > 0);
        })
	dispatch(dataSetAction(StateProperty.labs,response));
	return response;
    })
   , [currentPage,
      dispatch]);

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
      {userProfiles.data.currentProfile.profileType === 'internal' && (
        <Pagination as={'Container'} className='justify-content-end'>
             { state.data.labs.pagination.from > 0 &&
               <Pagination.First onClick={() => setCurrentPage(1)}/>
	     }
             { state.data.labs.pagination.from > 1 &&
              <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1,1))}/>
	     }
          <Pagination.Item active>{currentPage}</Pagination.Item>
              { showNextPage &&
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
	      }
        </Pagination>
      )}
    </>
  )
}
