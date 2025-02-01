
import React, { useState } from "react";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { MdOutlinePriceCheck } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
 
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
 
   const [image, setImage] = useState(null);
   
 
   const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleDescription = (content, delta, source, editor) => {
    setDescription(content);
  };


  return (
    <div className="create-ticket-wrapper">
      <h2 className="title">Create New Blog</h2>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="input-wrapper">
            <label htmlFor="">Ticket Description</label>
            <ReactQuill value={description} onChange={handleDescription} />
          </div>
        </div>
      </div>
      <div className="input-wrapper">
      <label htmlFor="">Upload Blog Image</label>
      <div className="file-uploader">
        <TbUpload />
      <input type="file"  onChange={handleFileChange} />
      </div>
      </div>
     

     

     
    
      
       
       
      
      <button className="create">
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
