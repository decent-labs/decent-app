import React from "react";
import {request} from "../requests";

export const states = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};

export function getStateOptions() {
  return [
    <option value='' key={'default'}>Select</option>,
    Object.keys(states).map((abbre) => {
      return <option value={abbre} key={abbre}>{states[abbre]}</option>;
    })
  ];
}

export function getPrescriptionData(patients) {
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

export function formatHtmlDate(date) {
  const datePieces = date.split('-');
  return `${datePieces[1]}-${datePieces[2]}-${datePieces[0]}`;
}
