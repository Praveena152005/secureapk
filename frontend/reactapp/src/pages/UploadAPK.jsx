import { useState } from "react";
import "../styles/UploadAPK.css";

function UploadAPK() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const steps = [
    "Uploading APK...",
    "Extracting Manifest...",
    "Analyzing Permissions...",
    "Extracting Features...",
    "Running ML Model...",
    "Generating Report..."
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.name.endsWith(".apk")) {
      alert("Please upload an APK file.");
      return;
    }

    setSelectedFile(file);
  };

  const startAnalysis = () => {
    if (!selectedFile) {
      alert("Please select an APK file first.");
      return;
    }

    setIsScanning(true);
    setProgress([]);

    let index = 0;

    const interval = setInterval(() => {
      setProgress((prev) => [...prev, steps[index]]);
      index++;

      if (index === steps.length) {
        clearInterval(interval);

        setTimeout(() => {
          alert("Analysis Completed!");
        }, 700);
      }
    }, 1000);
  };

  return (
    <div className="upload-container">

      <h1>SecureAPK AI</h1>

      <h2>Upload APK for Security Analysis</h2>

      <p>
        Upload an Android APK file to detect malware,
        analyze permissions and evaluate privacy risks.
      </p>

      <div className="upload-card">

        <div className="upload-box">

          <h3>📦 Choose APK File</h3>

          <input
            type="file"
            accept=".apk"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div className="file-info">
              <p><strong>Selected File</strong></p>

              <p>{selectedFile.name}</p>

              <p>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}

          <button
            onClick={startAnalysis}
            disabled={isScanning}
          >
            Analyze APK
          </button>

        </div>

      </div>

      <div className="progress-card">

        <h3>Scan Progress</h3>

        {!isScanning && (
          <p>Waiting for APK upload...</p>
        )}

        {progress.map((item, index) => (
          <div className="step" key={index}>
            ✅ {item}
          </div>
        ))}

      </div>

      <div className="recent-card">

        <h3>Recent Uploads</h3>

        <table>

          <thead>
            <tr>
              <th>APK</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>WhatsApp.apk</td>
              <td>Completed</td>
            </tr>

            <tr>
              <td>Telegram.apk</td>
              <td>Completed</td>
            </tr>

            <tr>
              <td>Instagram.apk</td>
              <td>Completed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UploadAPK;