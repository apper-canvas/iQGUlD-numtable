import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          404
        </div>
        <h1 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound