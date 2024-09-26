import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import fondo05 from './assets/fondo05.png';

const CarnetDigital = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [organismo, setOrganismo] = useState('');
  const [seccional, setSeccional] = useState('');
  const [generationDate, setGenerationDate] = useState(null);
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [dniActivo, setDniActivo] = useState(false);
  const [cardGenerated, setCardGenerated] = useState(false);
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [isDownloadButtonHovered, setDownloadButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cardRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateQRValue = () => {
    const uniqueNumberText = uniqueNumber ? `\nN° Único: ${uniqueNumber}` : '';
    return (
      `PE.CI.FA Afiliado/a activo\n` +
      `Nombre y apellido: ${name} ${lastName}\n` +
      `N° DNI: ${dni}\n` +
      `Seccional: ${seccional}\n` +
      `Destino: ${organismo}` +
      uniqueNumberText
    );
  };

  const handleValidarDatos = async () => {
    try {
      // Simulación de la validación de datos
      setDniActivo(true);
      setCardGenerated(true);
      setGenerationDate(new Date().toLocaleDateString());
      setUniqueNumber(Math.floor(Math.random() * 1000000) + 1);
    } catch (error) {
      console.error("Error al validar el DNI:", error);
      alert("Error al validar el DNI. Por favor, intenta de nuevo.");
    }
  };
  const generatePdf = () => {
    if (cardRef.current) {
      // Guardamos el estilo original
      const originalStyle = cardRef.current.style.transform;
  
      // Elimina la rotación antes de capturar
      cardRef.current.style.transform = 'none';
  
      html2canvas(cardRef.current, {
        scale: 3, // Escala aumentada para mayor calidad
        useCORS: true, // Permite cargar imágenes desde servidores externos
        backgroundColor: '#fff', // Especifica un color de fondo sólido
        logging: true, // Puedes activar los logs para ver si hay algún problema con la imagen
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0); // Calidad máxima
        const pdf = new jsPDF('p', 'mm', 'a6');
        const cardWidth = 90; // Ajusta el tamaño a 6x9 cm
        const cardHeight = 60;
        const x = (pdf.internal.pageSize.getWidth() - cardWidth) / 2;
        const y = (pdf.internal.pageSize.getHeight() - cardHeight) / 2;
  
        // Agrega la imagen al PDF
        pdf.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight, undefined, 'NONE');
        pdf.save('carnet.pdf');
  
        // Restaura el estilo original
        cardRef.current.style.transform = originalStyle;
      });
    }
  };
  
  
  const styles = {
    container: {
      padding: '20px',
      marginTop: '80px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '1.4',
    },
    form: {
      marginBottom: '30px',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f7f9fc',
    },
    input: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '16px',
      width: '100%',
      padding: '12px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease',
      outline: 'none',
    },
    button: {
      marginTop: '20px',
      padding: '12px 24px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      width: '100%',
      maxWidth: '200px',
      display: 'block',
      margin: '0 auto',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    card: {
      margin: 'auto',
      padding: '50px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      backgroundImage: `url(${fondo05})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      position: 'relative',
      overflow: 'hidden',
      filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))',
      transition: 'transform 0.5s ease-in-out',
      transform: isMobile ? 'rotate(90deg) scale(0.8)' : 'none',
      transformOrigin: 'center',
      left: isMobile ? '-80px' : '-40px',
      marginTop: isMobile ? '40px' : '100px',
    },
    '@media (max-width: 768px)': { 
      card: {
        transform: 'rotate(90deg) scale(0.5)',
        right: '0', 
        left: '0',
        marginTop: '20px',
      },
    },
    
  downloadButton: {
    marginTop: isMobile ? '80px' : '160px', // Aumenta el espacio para móviles
    padding: isMobile ? '8px 14px' : '10px 18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: isMobile ? '12px' : '14px',
    width: isMobile ? '60%' : '150px',
    maxWidth: '200px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    display: 'block',
    margin: '0 auto',
  },
    downloadButtonHover: {
      backgroundColor: '#0056b3',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      marginBottom: '10px',
    },
    leftContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginRight: '20px',
    },
    textContainer: {
      textAlign: 'left',
      color: '#fff',
      marginTop: '80px',
    },
    singleLineText: {
      fontWeight: 'bold',
      fontSize: '16px',
      margin: '2px 0',
      color: '#fff',
    },
    qrContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      border: 'px solid #007bff',
      padding: '8px',
      borderRadius: '8px',
      color: '#ebefda',
      marginTop: '45px',
      marginLeft: 'auto',
    },
    qrCode: {
      width: '80px',
      height: '80px',
      padding: '3px',
      border: '2px solid #ffcd30',
      borderRadius: '6px',
      boxSizing: 'content-box',
    },
    uniqueNumberText: {
      fontSize: '12px',
      fontWeight: 'bold',
      marginTop: '6px',
      color: '#fff',
    },
    dateText: {
      fontSize: '10px',
      marginTop: '-10px',
      color: '#fff',
    },
    unionText: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: 'rgba(0, 123, 255, 0.8)',
      padding: '5px',
      borderRadius: '8px',
      textAlign: 'center',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generar Credencial Digital</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Organismo"
          value={organismo}
          onChange={(e) => setOrganismo(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Seccional"
          value={seccional}
          onChange={(e) => setSeccional(e.target.value)}
          style={styles.input}
        />
        <button
          style={{
            ...styles.button,
            ...(isButtonHovered && styles.buttonHover),
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          onClick={handleValidarDatos}
        >
          Validar y Generar
        </button>
      </div>

      {cardGenerated && (
        <div style={styles.card} ref={cardRef}>
          <div style={styles.cardContent}>
            <div style={styles.leftContent}>
              <div style={styles.textContainer}>
                <p style={styles.singleLineText}>Nombre: {name} {lastName}</p>
                <p style={styles.singleLineText}>DNI: {dni}</p>
                <p style={styles.singleLineText}>Organismo: {organismo}</p>
                <p style={styles.singleLineText}>Seccional: {seccional}</p>
              </div>
            </div>
            <div style={styles.qrContainer}>
              <QRCode
                value={generateQRValue()}
                size={100}
                style={styles.qrCode}
              />
              <p style={styles.uniqueNumberText}>N° Único: {uniqueNumber}</p>
              <p style={styles.dateText}>Generado el: {generationDate}</p>
            </div>
          </div>
          <p style={styles.unionText}>¡Validez por 24 horas!</p>
        </div>
      )}

      {cardGenerated && (
        <button
          style={{
            ...styles.downloadButton,
            ...(isDownloadButtonHovered && styles.downloadButtonHover),
          }}
          onMouseEnter={() => setDownloadButtonHovered(true)}
          onMouseLeave={() => setDownloadButtonHovered(false)}
          onClick={generatePdf}
        >
          Descargar Credencial
        </button>
      )}
    </div>
  );
};

export default CarnetDigital;