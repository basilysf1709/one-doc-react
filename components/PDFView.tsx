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

const ExperienceComponent = () => {
  const experienceContainerStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px', // Adjust as needed
    flexWrap: 'wrap', // Allow the items to wrap if necessary
  };

  const experienceContentStyle: React.CSSProperties = {
    textAlign: 'left',
    flex: 1, // Take up the remaining space
    minWidth: '60%', // Ensure it doesn't get too small on large screens
  };

  const experienceHeaderStyle: React.CSSProperties = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // Space between icon and text
  };

  const experienceListStyle: React.CSSProperties = {
    listStyleType: 'disc',
    marginLeft: '20px',
    fontWeight: 'normal',
  };

  const dateLocationStyle: React.CSSProperties = {
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flexShrink: 0, // Prevent this part from shrinking
    marginLeft: '20px', // Ensure some space between the content and the dates
  };

  return (
    <div style={experienceContainerStyle}>
      <div style={experienceContentStyle}>
        <h3 style={experienceHeaderStyle}>
          <img src="/assets/Deloitte_Logo.png" />
          Deloitte
        </h3>
        <p>Software Engineer (DevOps / Infrastructure)</p>
        <ul style={experienceListStyle}>
          <li>Transitioned from manual deployments to Continuous Deployment (CD) by building a Deployment Pipeline that tests and deploys directly to AWS infrastructure, reducing deployment time from 20 minutes to lt 5 minutes</li>
          <li>Implemented an Application Load Balancer in AWS for efficient traffic distribution across multiple Fargate instances, reducing downtime from 15 minutes to 0 seconds for each deployment</li>
        </ul>
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
      <ExperienceComponent />
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
