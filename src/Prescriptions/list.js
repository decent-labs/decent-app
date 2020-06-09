import React, {useEffect, useState, useRef} from 'react';
import {format} from "date-fns";
import {Image, Row, Table } from "react-bootstrap";
import PrintIcon from '../assets/images/print-button-svgrepo-com.svg';
import Print from './print';
import {useReactToPrint} from "react-to-print";
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';
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
  const [showModal, setShowModal] = useState(selectedHash && selectedHash.length > 0);



  function getLastTestedDate(prescription) {
    if(prescription.data.length > 0)
      return format(new Date(prescription.data[prescription.data.length-1].createdAt), 'MM/dd/yyyy');
    return 'n/a';
  }

  function getTestResult(prescription) {
    if(prescription.data.length > 0)
      return JSON.parse(prescription.data[prescription.data.length-1].data).covidTestResult
    return 'n/a';
  }

  function getPrescriptions() {
    return items.map((curPrescription, index) => {
      return (
        <tr key={index}>
          <td>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{format(new Date(patient.dob), 'MM/dd/yyyy')}</td>
          <td>{getLastTestedDate(curPrescription)}</td>
          <td>{getTestResult(curPrescription)}</td>
          <td className='action-items d-flex justify-content-around'>
            <div style={{ display: "none" }}><Print patient={patient} prescription={curPrescription} ref={componentRef} /></div>
            <div onClick={handlePrint}>
              <Image src={PrintIcon} />
            </div>
              {['internal', 'prescriber', 'labAgent', 'lab', 'labOrg'].includes(userProfiles.data.currentProfile.profileType) &&
	       <Link to={`/patients/${patientId}/rxs/${curPrescription.hash}`}>
	       <div>
                 <Image src={PatientDetailsIcon}/>
	       </div>
	       </Link>
            }
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
      if (selectedHash && selectedHash.length > 0) {
        setShowModal(true);
      }
  }, [ patientId, selectedHash ]);

  return (
    <Row>
      <Table>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Date of Birth</th>
          <th>Date Tested</th>
          <th>Date of Results</th>
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
            selectedHash={selectedHash}
          />	  
    </Row>
  )
}

export default List;
