// import { useState,useEffect } from 'react'

// function CallDetail({ callId }) {
//   const [call, setCall] = useState();

//   useEffect(() => {
//     fetch(`/api/calls/${callId}`)
//       .then(r => r.json())
//       .then(setCall);
//   }, [callId]);

//   return (
//     <div>
//       <h1>{call.title}</h1>
//       <p>{call.transcript}</p>
//     </div>
//   );
// }

// export default CallDetail




import { useEffect, useState } from "react";

function CallDetail({ callId }) {
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!callId) {
      setError("Invalid call ID");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchCall() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/calls/${callId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch call (${response.status})`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error("Call not found");
        }

        setCall(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCall();

    return () => controller.abort();
  }, [callId]);

  if (loading) {
    return <div>Loading call details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!call) {
    return <div>No call data available.</div>;
  }

  return (
    <div>
      <h1>{call.title}</h1>
      <p>{call.transcript}</p>
    </div>
  );
}

export default CallDetail;
