import React from 'react'
import NavComp from '../components/NavComp'
import UploadForm from '../components/UploadeForm'

function Uploadpage() {
     const handleSubmit = (product) => {
    // Handle the uploaded product data here
    console.log(product);
    // You can also send the data to your server or perform any other necessary actions
  };
  return (
    <>
    <NavComp/>
<div>
      <UploadForm onSubmit={handleSubmit} />
    </div>
    

    </>
  )
}

export default Uploadpage