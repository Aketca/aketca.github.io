import { useState } from 'react'
import './App.css'

function App() {
    const STAFF_NOTES = [
        40, // E2
        41, // F2
        43, // G2
        45, // A2
        47, // B2
        48, // C3
        50, // D3
        52, // E3
        53, // F3
        55, // G3
        57, // A3
        59, // B3
        60, // C4
        62, // D4
        64, // E4
        65, // F4
        67, // G4
        69, // A4
        71, // B4
        72, // C5
        74, // D5
        76, // E5
        77, // F5
        79, // G5
        81, // A5
        83, // B5
    ];
    const NOTE_NAMES = {
        40: 'Мі малої октави (E2)',
        41: 'Фа малої октави (F2)',
        43: 'Соль малої октави (G2)',
        45: 'Ля малої октави (A2)',
        47: 'Сі малої октави (B2)',

        48: 'До першої октави (C3)',
        50: 'Ре першої октави (D3)',
        52: 'Мі першої октави (E3)',
        53: 'Фа першої октави (F3)',
        55: 'Соль першої октави (G3)',
        57: 'Ля першої октави (A3)',
        59: 'Сі першої октави (B3)',

        60: 'До другої октави (C4)',
        62: 'Ре другої октави (D4)',
        64: 'Мі другої октави (E4)',
        65: 'Фа другої октави (F4)',
        67: 'Соль другої октави (G4)',
        69: 'Ля другої октави (A4)',
        71: 'Сі другої октави (B4)',

        72: 'До третьої октави (C5)',
        74: 'Ре третьої октави (D5)',
        76: 'Мі третьої октави (E5)',
        77: 'Фа третьої октави (F5)',
        79: 'Соль третьої октави (G5)',
        81: 'Ля третьої октави (A5)',
        83: 'Сі третьої октави (B5)',
    };
    const OPEN_STRINGS = [
        64, // 1 струна E4
        59, // 2 струна B3
        55, // 3 струна G3
        50, // 4 струна D3
        45, // 5 струна A2
        40, // 6 струна E2
    ];
    const MAX_FRET = 20;
    const fretboard = OPEN_STRINGS.map((openMidi, stringIndex) => ({
        string: stringIndex + 1,
        frets: Array.from({ length: MAX_FRET + 1 }, (_, fret) => ({
            fret,
            midi: openMidi + fret,
        })),
    }));
    const [selectedMidi, setSelectedMidi] = useState(64)

  return (
    <>
        <div className={'app-wrapper'}>
            <section className={'staff'}>
                <h2>Позіціонування ноти</h2>
                <div className="staff-table-wrap">
                    <table>
                        <tbody>
                        { STAFF_NOTES.reverse().map((val, index) => (
                            <tr key={NOTE_NAMES[val]} className={'line tr-'+ val}>
                                <td className={'td td-'+ val}>
                                    <label className={'note-label'}>
                                        <input
                                            type="radio"
                                            value={val}
                                            name="note"
                                            checked={selectedMidi === val}
                                            onChange={() => setSelectedMidi(val)}
                                            className={`
                                                note
                                                ${selectedMidi === val ? 'note--selected' : ''}
                                            `}
                                        />
                                        <span className={'note-decoration'}></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className={'guitar-wrap'}>
                <h2>Розміщення на грифі - {NOTE_NAMES[selectedMidi]}</h2>
                <table className={'guitar'}>
                    <thead>
                    <tr>
                        <td>Відкрита</td>
                        { [...Array(MAX_FRET - 1)].map((_, index2) => (
                            <td key={index2 + 'fret-count'} className={'fret-name'}>{index2 + 1}</td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    { fretboard.map((val, index) => (
                        <tr key={val.string + index} className={'str str-'+ val.string}>
                            { val.frets.map((val2, index2) => (
                                <td
                                    key={val2.fret + index2}
                                    className={`
                                        fret
                                        fret-${val2.fret}__midi-${val2.midi}
                                        ${val2.midi === selectedMidi ? 'fret--active' : ''}
                                    `}
                                ></td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    </>
  )
}

export default App
