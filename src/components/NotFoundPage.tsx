import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FlickeringGrid } from './ui/flickering-grid';

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden font-space">
      <div className="absolute inset-0 w-full h-full">
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-8">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-400 tracking-wide">
          The page doesn't exist.
        </h1>

        <Link
          to="/"
          className="group flex items-center gap-3 text-lg text-neutral-500 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Go back home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
