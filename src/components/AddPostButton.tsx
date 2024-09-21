"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  // To use form Status hook the component must be client , that's why we create separate component for this button :-
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {" "}
      {pending ? (
        <div className="flex items-center gap-2">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </div>
      ) : (
        "Send"
      )}{" "}
    </button>
  );
};

export default AddPostButton;
