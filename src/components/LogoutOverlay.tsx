import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoutOverlayProps {
    isVisible: boolean;
}

const LogoutOverlay: React.FC<LogoutOverlayProps> = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            className="w-12 h-12 border-2 border-neutral-800 border-t-white rounded-full"
                        />
                        <div className="text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-normal text-white mb-2"
                            >
                                Signing out
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-neutral-500 text-sm"
                            >
                                Securing your workspace...
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LogoutOverlay;
