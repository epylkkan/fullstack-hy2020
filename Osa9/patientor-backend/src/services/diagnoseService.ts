import diagnoseData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
  return null;
};


export default {
  getEntries,
  addEntry
};