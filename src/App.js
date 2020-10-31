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
import { azertyConfig, qwertyConfig } from './cpKeyboard_config'

const CPKeyboardTypes = [
  { value : 'azerty', label : 'azerty' },
  { value : 'qwerty', label : 'qwerty' },
]
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

const defaultKeyConfigIndex = 2

function App() {
  let [currentKeyFullConfig, updateKeyFullConfig] = useState(configList[defaultKeyConfigIndex])
  let [nbDoubles, updateNbDoubles] = useState(0)
  let [nbOctaves, updateNbOctaves] = useState(1)
  let [selectedLanguage, updateLanguage] = useState(languages[1])
  let keyLabelConfigList = getKeyLabelList(selectedLanguage.value)
  let [currentKeyLabelConfig, updateKeyLabelConfig] = useState(keyLabelConfigList[defaultKeyConfigIndex])
  let [currentCPKeyboardOctave, updateCPKeyboardOctave] = useState(1)

  let [selectCPKeyboardType, updateSelectedCPKeyboardType] = useState(CPKeyboardTypes[0])
  let [currentCPKeyboardType, updateCPKeyboardType] = useState(azertyConfig)

  const handleCPKeyboardType = event => {
    updateSelectedCPKeyboardType(event)
    if(event.value === 'qwerty') {
      updateCPKeyboardType([...qwertyConfig])
    }
    else {
      updateCPKeyboardType([...azertyConfig])
    }
  }

  const handleConfig = event => {
    updateKeyLabelConfig(event)
    const nConfig = getKeyConfig(event.value)
    updateKeyFullConfig(nConfig)
  }

  const handleKeyDown = event => {
    currentCPKeyboardType.forEach(keyNote => {
      if (event.keyCode === keyNote.key) {
        const octave = keyNote.step + currentCPKeyboardOctave
        if (octave > 0 && octave < 5) {
          synth.triggerAttackRelease(keyNote.note+octave, "8n");
          const cssNote = `key-${keyNote.note.replace('#','s')+octave}`
          const cssElements = document.getElementsByClassName(cssNote)
          for (const elm of cssElements) {
            elm.style.fill = 'purple'
          }
        }
      }
    })
  }

  const handleKeyUp = event => {
    azertyConfig.forEach(keyNote => {
      if (event.keyCode === keyNote.key) {
        const octave = keyNote.step + currentCPKeyboardOctave
        if (octave > 0 && octave < 5) {
          const cssNote = `key-${keyNote.note.replace('#','s')+octave}`
          const cssElements = document.getElementsByClassName(cssNote)
          for (const elm of cssElements) {
            elm.style.fill = null
          }
        }
      }
    })
  }

  return (
    <div className="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      <div className='leftMenu'>
        <div>
          <h1 className='leftMainTitle'>{localizations['jankoKeyboard'][selectedLanguage.value]}</h1>
          <div>
          <div>
            <div className='labelTitle'>Language</div>
              <Dropdown options={languages} value={selectedLanguage}
                controlClassName='dropdown'
                className='dropdownroot'
                onChange={updateLanguage} placeholder="Select an option" />
            </div>
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
          <h3 className='labelTitle'>{localizations['cpKeyboardOptionsTitle'][selectedLanguage.value]}</h3>
          <div className='labelTitle'>{localizations['selectCPKeyboardOctave'][selectedLanguage.value]}</div>
          <NumericInput min={1} max={4} value={currentCPKeyboardOctave} onChange={updateCPKeyboardOctave} className="numericInput" />
          <div>
            <div className='labelTitle'>{localizations['selectCPKeyboardType'][selectedLanguage.value]}</div>
            <Dropdown options={CPKeyboardTypes} value={selectCPKeyboardType}
              controlClassName='dropdown'
              className='dropdownroot'
              onChange={handleCPKeyboardType} placeholder="Select an option" />
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