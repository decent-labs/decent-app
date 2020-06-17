import React, {useEffect, useState, useRef} from 'react';
import {format} from "date-fns";
import isEmpty from 'lodash.isempty';
import {Image, Table } from "react-bootstrap";
import PrintIcon from '../assets/images/print-button-svgrepo-com.svg';
import EditIcon from '../assets/images/bmx-pencil.svg';
import Print from './print';
import {useReactToPrint} from "react-to-print";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import TestResultModal from './TestResultModal';
import { Link, useParams, useHistory } from "react-router-dom";
function List({ patient, items }) {
  const { id: patientId,
	    rxhash: selectedHash
	}  = useParams();
  const history = useHistory();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true
  })
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const [showModal, setShowModal] = useState(false);

  function getLastTestedDate(prescription) {
    if(prescription.data.length > 0)
      return format(new Date(prescription.data[prescription.data.length-1].createdAt), 'MM/dd/yyyy');
    return 'n/a';
  }

  function getTestResult(prescription) {
    if(prescription.data.length > 0){
      const results = JSON.parse(prescription.data[prescription.data.length-1].data).covidTestResult;

      if(!results || isEmpty(results))
        return <td>n/a</td>

      if(results.toLowerCase() === 'positive')
        return <td className='positive'>{results}</td>

      return <td className='negative'>{results}</td>
    }
    return <td>n/a</td>;
  }

  function getPrescriptions() {
    return items.map((curPrescription, index) => {
      return (
        <tr key={index}>
          <td className='first-row-element'>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{new Date(patient.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}</td>
          <td>{getLastTestedDate(curPrescription)}</td>
          {getTestResult(curPrescription)}
          <td className='action-items last-row-element'>
            <div>
              <div className='icon mr-1' onClick={handlePrint}>
                <Image src={PrintIcon} />
                <div style={{ display: "none" }}><Print patient={patient} prescription={curPrescription} ref={componentRef} /></div>
              </div>
              {['internal', 'prescriber', 'labAgent', 'lab', 'labOrg'].includes(userProfiles.data.currentProfile.profileType) &&
              <Link to={`/patients/${patientId}/rxs/${curPrescription.hash}/edit`}>
                <div className="icon">
                  <Image src={EditIcon}/>
                </div>
              </Link>
              }
            </div>
          </td>
        </tr>
      );
    })
  }

  const closeModal = () => {
      setShowModal(false);
      history.push('..');
  }

  useEffect( () => {
      if (isEmpty(selectedHash))
        return;

      setShowModal(true);
  }, [ patientId, selectedHash ]);

  return (
    <>
      <Table>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Date of Birth</th>
          <th>Date Tested</th>
          <th>Covid Test</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {getPrescriptions()}
        </tbody>
      </Table>
	  <TestResultModal
            show={showModal}
            closeHandler={() => closeModal() }
          />
    </>
  )
}

export default List;
