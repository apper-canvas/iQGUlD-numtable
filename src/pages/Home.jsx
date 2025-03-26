import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('explore')
  
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore the <span className="text-gradient">Magic of Numbers</span>
        </motion.h1>
        <motion.p 
          className="text-lg text-surface-600 dark:text-surface-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Visualize multiplication tables, factors, multiples, and more with our interactive number explorer.
        </motion.p>
      </section>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 rounded-xl bg-surface-100 dark:bg-surface-800 shadow-inner">
          {['explore', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 capitalize">
                {tab}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'explore' ? (
            <MainFeature />
          ) : (
            <div className="card p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">About NumTable</h2>
              <p className="mb-4 text-surface-600 dark:text-surface-300">
                NumTable is an interactive tool designed to help you explore and visualize the properties of numbers through various tables and representations.
              </p>
              <p className="mb-4 text-surface-600 dark:text-surface-300">
                Whether you're a student learning mathematics, a teacher creating educational materials, or simply curious about number patterns, NumTable provides an intuitive way to generate and explore:
              </p>
              <ul className="list-disc pl-5 mb-4 text-surface-600 dark:text-surface-300 space-y-2">
                <li>Multiplication tables</li>
                <li>Division tables</li>
                <li>Factors and multiples</li>
                <li>Prime factorization</li>
                <li>Number properties</li>
              </ul>
              <p className="text-surface-600 dark:text-surface-300">
                Simply enter a number, select the type of table you want to visualize, and customize the range to suit your needs.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Home