import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white text-black py-6 border-t vorder-t-gray-200">
            <div className="container mx-auto text-center">
                <p className="text-lg font-bold">
                    &copy; {new Date().getFullYear()}  All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
