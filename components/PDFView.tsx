"use client";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaUniversity, FaBriefcase } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

// const EducationComponent = () => {

//   const educationContainerStyle: React.CSSProperties = {
//     fontFamily: "'Montserrat', sans-serif",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//   };

//   const educationIconStyle: React.CSSProperties = {
//     fontSize: "1em",
//     marginRight: "8px",
//   };

//   const educationContentStyle: React.CSSProperties = {
//     textAlign: "left",
//     flex: 1,
//   };

//   const educationHeaderStyle: React.CSSProperties = {
//     fontWeight: "bold",
//   };

//   const educationDetailsStyle: React.CSSProperties = {
//   };

//   const locationStyle: React.CSSProperties = {
//     textAlign: "right",
//   };

//   return (
//     <div style={educationContainerStyle}>
//       <FaUniversity style={educationIconStyle} />
//       <div style={educationContentStyle}>
//         <h3 style={educationHeaderStyle}>University of Guelph</h3>
//         <p style={educationDetailsStyle}>Bachelor of Computing, Computer Science and Economics</p>
//         <p style={educationDetailsStyle}>cGPA: 4.0</p>
//       </div>
//       <div style={locationStyle}>
//         <p>Guelph, Ontario</p>
//         <p>Canada</p>
//       </div>
//     </div>
//   );
// };


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
    justifyContent: "center",
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
  const experienceContainerStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };

  const experienceContentStyle: React.CSSProperties = {
    textAlign: 'left',
    flex: 1, 
    minWidth: '60%',
  };

  const experienceHeaderStyle: React.CSSProperties = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };

  const experienceListStyle: React.CSSProperties = {
    marginLeft: '20px',
    fontWeight: 'normal',
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
