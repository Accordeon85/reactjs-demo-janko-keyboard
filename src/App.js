import React, { useState } from 'react';
import './App.css';
import notes from './octave_notes'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import NumericInput from 'react-numeric-input'
import * as Tone from 'tone'
import JankoContainer from './Components/jankoContainer'
import { keyConfigs } from './key_configs'
import { localizations, languages } from './localizations'

const synth = new Tone.Synth().toDestination();

const onKeyClick = (note) => {
  const formatedNote = note.replace('key-','').replace('s','#')
  synth.triggerAttackRelease(formatedNote, "8n");
}
const configList = Object.values(keyConfigs);

const getKeyConfig = keyShape => {
  return configList.find(k => k.keyShape === keyShape)
}


// value/label list for dropdown
const getKeyLabelList = language => {
  return configList.map(c => { return { value:c.keyShape, label: localizations[c.keyShape][language] }})
}

const defaultKeyIndex = 2

function App() {
  let [currentKeyFullConfig, updateKeyFullConfig] = useState(configList[defaultKeyIndex])
  let [nbDoubles, updateNbDoubles] = useState(0)
  let [nbOctaves, updateNbOctaves] = useState(1)
  let [selectedLanguage, updateLanguage] = useState(languages[1])
  let keyLabelConfigList = getKeyLabelList(selectedLanguage.value)
  let [currentKeyLabelConfig, updateKeyLabelConfig] = useState(keyLabelConfigList[defaultKeyIndex])

  const handleConfig = event => {
    updateKeyLabelConfig(event)
    const nConfig = getKeyConfig(event.value)
    updateKeyFullConfig(nConfig)
  }

  const handleLanguage = event => {
    updateLanguage(event)
  }

  return (
    <div className="App">
      <div className='leftMenu'>
        <div>
          <h1 className='leftMainTitle'>{localizations['jankoKeyboard'][selectedLanguage.value]}</h1>
          <div>
            <div className='labelTitle'>{localizations['selectKeysShape'][selectedLanguage.value]}</div>
            <Dropdown options={keyLabelConfigList} value={currentKeyLabelConfig}
              controlClassName='dropdown'
              className='dropdownroot'
              onChange={handleConfig} placeholder="Select an option" />
          </div>
          <div className='labelTitle'>{localizations['selectNbOctaves'][selectedLanguage.value]}</div>
            <NumericInput min={1} max={3} value={nbOctaves} onChange={updateNbOctaves} className="numericInput" />
          </div>
          <div>
            <div className='labelTitle'>{localizations['selectNbDoubles'][selectedLanguage.value]}</div>
            <NumericInput min={0} max={2} value={nbDoubles} onChange={updateNbDoubles} className="numericInput" />
          </div>
          <div>
          <div>
            <div className='labelTitle'>Language</div>
            <Dropdown options={languages} value={selectedLanguage}
              controlClassName='dropdown'
              className='dropdownroot'
              onChange={handleLanguage} placeholder="Select an option" />
          </div>
        </div>
      </div>
      <JankoContainer { ...currentKeyFullConfig }
        notes = {notes}
        doubles={nbDoubles}
        nbOctaves={nbOctaves}
        onKeyClick={onKeyClick}
        />
    </div>
  );
}

export default App;
