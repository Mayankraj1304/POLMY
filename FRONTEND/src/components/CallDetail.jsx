import { useEffect, useState } from "react";
import { getCallList, getCallById } from "../services/callService.js";

export default function CallDetail() {
  const [calls, setCalls] = useState([]);
  const [selectedCallId, setSelectedCallId] = useState("");
  const [call, setCall] = useState(null);
  const [isFetchingCalls, setIsFetchingCalls] = useState(true);
  const [isFetchingCall, setIsFetchingCall] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCallList() {
      try {
        setIsFetchingCalls(true);
        setErrorMessage("");

        const data = await getCallList({ signal: controller.signal });
        setCalls(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
        }
      } finally {
        setIsFetchingCalls(false);
      }
    }

    loadCallList();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedCallId) {
      setCall(null);
      return;
    }

    const controller = new AbortController();

    async function loadCallDetails() {
      try {
        setIsFetchingCall(true);
        setErrorMessage("");

        const data = await getCallById(selectedCallId, {
          signal: controller.signal,
        });
        setCall(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
          setCall(null);
        }
      } finally {
        setIsFetchingCall(false);
      }
    }

    loadCallDetails();

    return () => controller.abort();
  }, [selectedCallId]);

  return (
    <section className="call-detail-page">
      <div className="call-detail-card">
        <h1 className="call-detail-title">Call details</h1>

        <label htmlFor="call-select" className="call-detail-label">
          Select a call ID
        </label>
        <select
          id="call-select"
          className="select-field"
          value={selectedCallId}
          onChange={(event) => setSelectedCallId(event.target.value)}
        >
          <option value="">-- choose a call --</option>
          {calls.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id} - {item.title}
            </option>
          ))}
        </select>

        {isFetchingCalls && <p className="status-text">Loading call list…</p>}

        {errorMessage && (
          <div className="error-message">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {!selectedCallId && !isFetchingCalls && !errorMessage && (
          <p className="status-text">Please select a call to view details.</p>
        )}

        {isFetchingCall && <p className="status-text">Loading call details…</p>}

        {call && !isFetchingCall && (
          <div className="call-card">
            <h2>{call.title}</h2>
            <p className="call-meta">Call ID: {call.id}</p>
            <p>{call.transcript}</p>
          </div>
        )}
      </div>
    </section>
  );
}
