import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const SingleImageUploader = ({ setFileName, setFilePrview, initialImage }) => {
  const [file, setFile] = useState(
    initialImage ? { file: null, preview: initialImage } : null
  );

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0]; // Only accept the first file
    if (newFile) {
      const fileWithPreview = {
        file: newFile,
        preview: URL.createObjectURL(newFile),
      };
      console.log("fileWithPreview", fileWithPreview)
      setFile(fileWithPreview); // Set the file with preview
      setFilePrview(fileWithPreview);
      setFileName(newFile);
    }
  };

  const removeImage = () => {
    setFile(null); // Remove the current file
    setFileName(null);
    setFilePrview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  // 👇 Add this effect to handle initialImage updates
  useEffect(() => {
    if (initialImage) {
      const fileWithPreview = {
        file: null,
        preview: initialImage,
      };
      setFile(fileWithPreview);
      setFilePrview(fileWithPreview);
    }
  }, [initialImage]);

  // Clean up object URL when unmounting or replacing file
  useEffect(() => {
    return () => {
      if (file && file.file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer min-h-[10px] rounded border-border-gray ${
          isDragActive ? "bg-blue-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-font-200">Drag & drop</p>
      </div>

      {file && (
        <div className="relative w-32 h-32">
          <img
            src={file.preview}
            alt={file.file ? file.file.name : "Existing Image"}
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
