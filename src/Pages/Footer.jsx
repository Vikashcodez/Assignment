import React from 'react';
import { Instagram, Linkedin, Github, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-teal-400">Get in Touch</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-300">
                <span className="text-teal-400">Address:</span> Hyderabad, Telangana, India
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span className="text-teal-400">Mobile:</span> +91 953907093
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <span className="text-teal-400">Email:</span> chotuvikash6@gmail.com
              </p>
            </div>
          </div>
          
          
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-4 text-teal-400">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/vikashvkz?igsh=MTBocnR4ZTQ5M3JweA==" target="_blank" rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 hover:scale-110">
                <Instagram size={24} />
              </a>
              
              <a href="https://www.linkedin.com/in/vikash-b1008521b" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:scale-110">
                <Linkedin size={24} />
              </a>
              
              <a href="https://github.com/Vikashcodez" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                <Github size={24} />
              </a>
              
              <a href="https://drive.google.com/file/d/1iD8F_uxxIdPoqNyu-jmp5roP4XCa0Hro/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 transition-all duration-300 hover:scale-110">
                <FileText size={24} />
              </a>
            </div>
          </div>
        </div>
        
        
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent my-8"></div>
        
        
        <div className="text-center">
          <p className="text-gray-400">
            <span className="block mb-1 sm:inline sm:mb-0">© 2025 All Rights Reserved.</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span className="block sm:inline">Designed by Vikash</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;