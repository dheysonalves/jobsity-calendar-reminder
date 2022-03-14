import React from 'react';
import Calendar from './components/calendar/Calendar';
import useCurrentDateTime from './hooks/useCurrentDateTime';
import './App.scss';

function App() {
  const {currentMonthName} = useCurrentDateTime();

  return (
    <div className="App">
      <header className="App-header">
        <h1>{currentMonthName}</h1>
        <Calendar />
      </header>
    </div>
  );
}

export default App;
