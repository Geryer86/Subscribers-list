import {useEffect, useRef, useState} from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import {Sub, SubsResponseFromApi} from './types';

interface AppState {
  subs: Array<Sub>,
  newSubsNumber: number
}


function App() {
  
  const [subs, setSubs] = useState<AppState['subs']>([])  // ----> useState<Sub[]>
  
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0)

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return fetch('http://localhost:3001/subs').then(res => res.json())

    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const { nick, months: subMonths, profileUrl: avatar, description } = subFromApi
        return { nick, subMonths, avatar, description }
      })
    }

    fetchSubs()
    .then(mapFromApiToSubs)
    .then(setSubs)
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n + 1)
  }

  return (
    <div className="App" ref={divRef}>
      <h1>Subscribers List</h1>
      <List subs={subs} />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub}/>
    </div>
  );
}

export default App;
