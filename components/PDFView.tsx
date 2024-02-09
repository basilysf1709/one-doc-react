"use client";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaSchool } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

const EducationComponent = () => {

  const educationContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start", // Aligns children to the start of the container
    alignItems: "flex-start",
    padding: "0", // Add padding if needed
    // ... other styles you might need
  };

  const educationIconStyle: React.CSSProperties = {
    marginRight: "8px", // Space between icon and text
    // ... other styles you might need
  };

  const educationContentStyle: React.CSSProperties = {
    textAlign: "left",
    // ... other styles you might need
  };

  return (
    <div style={educationContainerStyle}>
      <FaSchool style={educationIconStyle} />
      <div style={educationContentStyle}>
        <h3>University of Guelph</h3>
        <p>Bachelor of Computing, Computer Science and Economics</p>
        <p>cGPA: 4.0</p>
        <p>Skills</p>
        {/* Add other content here */}
      </div>
    </div>
  );
};

const ResumeComponent = () => {

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "4px",
    width: "100%"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "normal",
    marginBottom: "4px",
    fontFamily: "'Montserrat', sans-serif",
  };

  const contactInfoStyle: React.CSSProperties = {
    fontFamily: '"Courier New", Courier, monospace',
    marginBottom: "4px",
    width: "100%",
    display: "flex",
    justifyContent: "center", // Centers children horizontally in the container
    alignItems: "center",
    flexDirection: "column"
  };

  const linkContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5px"
  }

  const contactSpanStyle = {
    fontSize: "14px",
    margin: "0 5px",
    whiteSpace: "nowrap",
    color: "black",
  };
  return (
    <div style={headerStyle}>
      <h2 style={titleStyle}>BASIL YUSUF</h2>
      <div style={contactInfoStyle}>
        <div style={linkContainer}>
          <a href="" style={contactSpanStyle}>
            <FaEnvelope />
          </a>
          |
          <a href="" style={contactSpanStyle}>
            <FaGithub />
          </a>
          |
          <a href="" style={contactSpanStyle}>
            <FaLinkedin />
          </a>
          |
          <a href="" style={contactSpanStyle}>
            <FaPhone />
          </a>
        </div>
      </div>
    </div>
  );
};

const PDFView = () => {
  const [pdfData, setPdfData] = useState<any>(null);
  const htmlContent = ReactDOMServer.renderToString(<ResumeComponent />);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("/api/v1/getPDF", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html: htmlContent }),
        });
        const blob = await response.blob();
        setPdfData(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {pdfData ? (
        <object
          data={pdfData}
          type="application/pdf"
          style={{ width: "100%", height: "100%", border: "none" }}
        >
          <p>
            Your browser does not support PDFs.{" "}
            <a href={pdfData}>Download the PDF</a>.
          </p>
        </object>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFView;
