
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Success({ message = "Update successful!" }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 bg-green-100 text-green-800 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 z-50"
    >
      <CheckCircle2 className="text-green-600 w-6 h-6" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
}
