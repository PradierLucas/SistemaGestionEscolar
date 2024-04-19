

// cliente-calendario/src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h2>Calendario</h2>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default Calendario;
