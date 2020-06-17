import {request} from "../../../requests";

const initialState = {
    currentPrescription: {

    }
};

function setData(state = initialState, action) {
    return {
	currentPrescription: action.data
    }
}

function getPrescriptionData(patients) {
  return Promise.all(patients)
    .then(profiles => Promise.all(profiles.map(curProfile =>
        request(`patients/${curProfile.profile.id}/rxs`, 'GET')
          .then(patientResults => {
              return Promise.all(patientResults.prescriptions.map(
                curPrescription => request(`rxs/${curPrescription.hash}`).then(curPrescriptionWithTests => curPrescriptionWithTests.prescriptionInfo)
              )).then(prescriptions => {
                curProfile.profile.prescriptions = prescriptions;
                return curProfile.profile;
              });
            }
          )
          .catch(err => {
            curProfile.profile.prescriptions = [];
            return curProfile.profile;
          })
      ))
    )
}
export { initialState, setData, getPrescriptionData };
