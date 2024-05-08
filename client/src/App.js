import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Herosection from './components/Herosection';
import Feature from './components/Feature';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [compressedImageUrl, setCompressedImageUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const notify = () => toast.success('Image uploaded successfully!');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        if (responseData?.message) {
          setMessage(responseData.message);
          const filename = responseData.filename;
          console.log(filename);
          const uploadedImageUrl = `http://localhost:5000/input/${filename}`;
          setUploadedImageUrl(uploadedImageUrl);

          // Fetch compressed image URL
          const compressedResponse = await axios.get(`http://localhost:5000/output/${filename}`, { responseType: 'blob' });
          if (compressedResponse.data) {
            const compressedImageUrl = URL.createObjectURL(compressedResponse.data);
            setCompressedImageUrl(compressedImageUrl);
            setDownloadUrl(compressedImageUrl); // Set download URL dynamically
          } else {
            setMessage('Failed to fetch compressed image.');
          }
        } else {
          setMessage('Failed to upload and compress the image.');
        }
      } else {
        setMessage('Failed to upload and compress the image.');
      }
    } catch (error) {
      setMessage('An error occurred while uploading and compressing the file.');
      console.error('Error uploading and compressing file:', error);
    }
  };

  const handleDownload = async () => {
    // window.open(downloadUrl, '_blank');
    toast.success('Download Completed!');
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-transparent via-transparent bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: 'radial-gradient(#2f1984 1.5px, transparent 1.5px)',
        backgroundSize: '43px 43px',
        backgroundPosition: '0 0',
        backgroundColor: '#f8d9eb'
      }}
    >
      <Navbar />
      <Herosection />
      <Feature />
      <div className="text-center mb-20" id='scroll'>
        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Image Compressor</h1>
        <p className="leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-2xl">Upload Image</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input className="mx-auto block w-90 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" onChange={handleFileChange}></input>
        <br />
        <div className="text-center mb-10 mt-5">
          <button type="submit" className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={notify}>Upload</button>
          <Toaster />
        </div>
      </form>
      <div className="text-center mb-10">
        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Compressed Image</h1>
      </div>
      <div className='h-screen flex items-center justify-center'>
        {compressedImageUrl && <img src={compressedImageUrl} alt="Compressed" style={{ maxWidth: '30%' }} className='justify-center items-center' />}
      </div>
      {/* <div className="text-center mb-10 mt-10">
        {compressedImageUrl && <button onClick={handleDownload} className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Download Compressed Image</button>}
      </div> */}



      <div className='text-center'>
        <a href={downloadUrl} className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' download>
          <button onClick={handleDownload}>Download</button>
          <Toaster />
        </a>
      </div>





    </div>
  );
}

export default App;
