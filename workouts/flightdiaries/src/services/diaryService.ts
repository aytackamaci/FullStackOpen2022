import diariesData from '../../data/diaries.json'

import { NonSensitiveDiaryEntry, DiaryEntry } from '../types'

const diaries: Array<DiaryEntry> = diariesData as Array<DiaryEntry>;


const getEntries = () : DiaryEntry[] => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return []
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
}