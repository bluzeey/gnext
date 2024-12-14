import React from "react";

function Footer() {
  return (
    <footer className="grid w-full divide-y divide-gray-300 bg-[#f2f2f2] text-xl text-gray-900">
      <div className="px-8 py-3">
        <p>India</p>
      </div>
      <div className="flex p-4">
        <div className="flex justify-start ml-8 space-x-8 whitespace-nowrap md:justify-self-start">
          <p>Advertising</p>
          <p>Business</p>
          <p>How Search Works</p>
        </div>
        <div className="flex justify-end mr-8 space-x-8 md:ml-auto">
          <p>Privacy</p>
          <p>Terms</p>
          <p>Settings</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
