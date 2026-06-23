import { motion } from "framer-motion";

export default function VideoModal({ isOpen, videoUrl, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl"
      >
        {/* Close Button Trigger */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-black/80 transition-colors border border-white/10"
        >
          ✕
        </button>

        {/* Video Player Render */}
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Case Study Preview"
        />
      </motion.div>
    </div>
  );
}