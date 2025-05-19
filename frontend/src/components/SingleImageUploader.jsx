import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const SingleImageUploader = ({setFileName, setFilePrview}) => {
  const [file, setFile] = useState(null);

  // console.log("file", file)

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0]; // Only accept the first file
    if (newFile) {
      const fileWithPreview = {
        file: newFile,
        preview: URL.createObjectURL(newFile),
      };
      console.log("fileWithPreview")
      setFile(fileWithPreview); // Set the file with preview
      setFilePrview(fileWithPreview)
      setFileName(newFile)
    }
  };

  const removeImage = () => {
    setFile(null); // Remove the current file
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false, // Allow only one image
  });

  useEffect(() => {
    // Cleanup memory when the preview is no longer needed
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer min-h-[10px] rounded  ${
          isDragActive ? 'bg-blue-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop</p>
      </div>

      {/* Image Preview */}
      {file && (
        <div className="relative w-32 h-32">
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-full h-full object-cover rounded-md"
          />
          <button
            onClick={removeImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleImageUploader;
