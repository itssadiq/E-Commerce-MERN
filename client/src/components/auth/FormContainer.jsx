import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
