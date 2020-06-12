import React, {useEffect, useState, useRef} from 'react';
import {format} from "date-fns";
import {Image, Table } from "react-bootstrap";
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
    if(prescription.data.length > 0){
      const results = JSON.parse(prescription.data[prescription.data.length-1].data).covidTestResult;

      if(results === 'positive')
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
          <td>{format(new Date(patient.dob), 'MM/dd/yyyy')}</td>
          <td>{getLastTestedDate(curPrescription)}</td>
          {getTestResult(curPrescription)}
          <td className='action-items d-flex last-row-element '>
            <div style={{ display: "none" }}><Print patient={patient} prescription={curPrescription} ref={componentRef} /></div>
            <div className='mr-1' onClick={handlePrint}>
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
            selectedHash={selectedHash}
          />
    </>
  )
}

export default List;
