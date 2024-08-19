import React from 'react';
// Usa íconos de react-icons o cualquier otra librería

interface AsideProps {
    isExpanded: boolean;
    toggleAside: () => void;
}

const Asides: React.FC<AsideProps> = ({ isExpanded, toggleAside }) => {
    return (
        <div className="h-full flex flex-col bg-gray-800 text-white">
            <div className="flex items-center justify-between p-4">
                <span className={`${isExpanded ? 'block' : 'hidden'} text-lg font-bold`}>Menu</span>
                <button onClick={toggleAside} className="text-xl">
                    {isExpanded ? <p>ext</p> : <p>Ret</p>}
                </button>
            </div>
            <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <h2>H</h2>
                <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>Dashboard</span>
            </a>
            <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <h2>L</h2>
                <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>Settings</span>
            </a>
        </div>
    );
};

export default Asides;
