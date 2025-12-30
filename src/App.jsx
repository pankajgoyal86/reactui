import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      setMessage("❌ Please select a file first");
      return;
    }

    setMessage("Uploading...");
    setResponseData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://ad4al62702.execute-api.ap-south-1.amazonaws.com/dev/uploadfile",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            // ❌ DO NOT set Content-Type
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();
      setResponseData(data);
      setMessage("✅ File uploaded successfully");
    } catch (err) {
      console.error(err);
      setMessage("❌ File upload failed");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h2>Upload File to S3</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>Upload</button>

      <br /><br />

      <p>{message}</p>

      {/* ✅ Show API response */}
      {responseData && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "#f9f9f9",
          }}
        >
          <h4>Upload Response</h4>
          <p><b>Message:</b> {responseData.message}</p>
          <p><b>Filename:</b> {responseData.filename}</p>
          <p><b>S3 Key:</b> {responseData.s3_key}</p>
          <p><b>Bucket:</b> {responseData.bucket}</p>
          <p><b>Size:</b> {responseData.size} bytes</p>
          <p><b>Content Type:</b> {responseData["content-type"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
