import { useState,useEffect } from 'react'

function CallDetail({ callId }) {
  const [call, setCall] = useState();

  useEffect(() => {
    fetch(`/api/calls/${callId}`)
      .then(r => r.json())
      .then(setCall);
  }, [callId]);

  return (
    <div>
      <h1>{call.title}</h1>
      <p>{call.transcript}</p>
    </div>
  );
}

export default CallDetail
