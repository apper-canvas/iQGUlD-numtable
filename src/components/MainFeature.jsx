import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, ChevronUp, Info, X } from 'lucide-react'

const MainFeature = () => {
  const [number, setNumber] = useState('')
  const [tableType, setTableType] = useState('multiplication')
  const [range, setRange] = useState({ start: 1, end: 12 })
  const [tableData, setTableData] = useState([])
  const [numberProperties, setNumberProperties] = useState(null)
  const [error, setError] = useState('')
  const [showProperties, setShowProperties] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Generate table data when inputs change
  useEffect(() => {
    if (number && !isNaN(number) && number > 0) {
      generateTable()
      calculateNumberProperties()
      setError('')
    } else if (number && (isNaN(number) || number <= 0)) {
      setError('Please enter a positive number')
      setTableData([])
      setNumberProperties(null)
    }
  }, [number, tableType, range])

  const generateTable = () => {
    const num = parseInt(number)
    const { start, end } = range
    let data = []

    if (tableType === 'multiplication') {
      for (let i = start; i <= end; i++) {
        data.push({
          operation: `${num} × ${i}`,
          result: num * i
        })
      }
    } else if (tableType === 'division') {
      for (let i = start; i <= end; i++) {
        data.push({
          operation: `${num * i} ÷ ${num}`,
          result: i
        })
      }
    } else if (tableType === 'addition') {
      for (let i = start; i <= end; i++) {
        data.push({
          operation: `${num} + ${i}`,
          result: num + i
        })
      }
    } else if (tableType === 'subtraction') {
      for (let i = start; i <= end; i++) {
        data.push({
          operation: `${num + i} - ${num}`,
          result: i
        })
      }
    }

    setTableData(data)
  }

  const calculateNumberProperties = () => {
    const num = parseInt(number)
    
    // Calculate factors
    const factors = []
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i)
      }
    }
    
    // Check if prime
    const isPrime = factors.length === 2
    
    // Calculate prime factorization
    const primeFactors = []
    let n = num
    let divisor = 2
    
    while (n > 1) {
      while (n % divisor === 0) {
        primeFactors.push(divisor)
        n = n / divisor
      }
      divisor++
    }
    
    // Group prime factors
    const primeFactorization = primeFactors.reduce((acc, factor) => {
      acc[factor] = (acc[factor] || 0) + 1
      return acc
    }, {})
    
    setNumberProperties({
      isEven: num % 2 === 0,
      isPrime,
      factors,
      primeFactorization
    })
  }

  const handleNumberChange = (e) => {
    const value = e.target.value
    setNumber(value)
  }

  const handleRangeChange = (type, value) => {
    const newValue = parseInt(value)
    if (!isNaN(newValue)) {
      setRange(prev => ({ ...prev, [type]: newValue }))
    }
  }

  const tableTypeOptions = [
    { value: 'multiplication', label: 'Multiplication' },
    { value: 'division', label: 'Division' },
    { value: 'addition', label: 'Addition' },
    { value: 'subtraction', label: 'Subtraction' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="neu-card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Enter a Number
            </label>
            <div className="relative">
              <input
                type="number"
                value={number}
                onChange={handleNumberChange}
                placeholder="Enter a positive number"
                className="input pl-10"
                min="1"
              />
              <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            </div>
            {error && (
              <p className="mt-2 text-sm text-accent">{error}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Table Type
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="input text-left flex items-center justify-between"
              >
                <span>{tableTypeOptions.find(opt => opt.value === tableType)?.label}</span>
                {isDropdownOpen ? (
                  <ChevronUp size={18} className="text-surface-500" />
                ) : (
                  <ChevronDown size={18} className="text-surface-500" />
                )}
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 py-1"
                  >
                    {tableTypeOptions.map(option => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 ${
                          tableType === option.value ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''
                        }`}
                        onClick={() => {
                          setTableType(option.value)
                          setIsDropdownOpen(false)
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Start Range
            </label>
            <input
              type="number"
              value={range.start}
              onChange={(e) => handleRangeChange('start', e.target.value)}
              className="input"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              End Range
            </label>
            <input
              type="number"
              value={range.end}
              onChange={(e) => handleRangeChange('end', e.target.value)}
              className="input"
              min={range.start}
            />
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {number && !error && tableData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {tableTypeOptions.find(opt => opt.value === tableType)?.label} Table for {number}
              </h2>
              
              <button
                onClick={() => setShowProperties(!showProperties)}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <Info size={16} />
                <span>{showProperties ? 'Hide' : 'Show'} Properties</span>
              </button>
            </div>
            
            <AnimatePresence>
              {showProperties && numberProperties && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card p-6 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-l-4 border-primary"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Properties of {number}</h3>
                    <button 
                      onClick={() => setShowProperties(false)}
                      className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-2 font-medium">Basic Properties:</p>
                      <ul className="space-y-1 text-surface-700 dark:text-surface-300">
                        <li>• {number} is {numberProperties.isEven ? 'even' : 'odd'}</li>
                        <li>• {number} is {numberProperties.isPrime ? '' : 'not '}a prime number</li>
                        <li>• Sum of digits: {number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="mb-2 font-medium">Factors:</p>
                      <div className="flex flex-wrap gap-2">
                        {numberProperties.factors.map(factor => (
                          <span 
                            key={factor} 
                            className="px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-md text-sm"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="mb-2 font-medium">Prime Factorization:</p>
                      <div className="flex items-center flex-wrap gap-2">
                        {Object.entries(numberProperties.primeFactorization).map(([prime, power], index, arr) => (
                          <span key={prime} className="flex items-center">
                            <span className="text-primary font-medium">{prime}</span>
                            {power > 1 && <sup className="text-xs ml-0.5">{power}</sup>}
                            {index < arr.length - 1 && <span className="mx-1">×</span>}
                          </span>
                        ))}
                        <span className="ml-2 text-surface-500">= {number}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-surface-100 dark:bg-surface-800 text-left rounded-tl-lg">Operation</th>
                    <th className="py-3 px-4 bg-surface-100 dark:bg-surface-800 text-left rounded-tr-lg">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className={`border-b border-surface-200 dark:border-surface-700 ${
                        index % 2 === 0 ? 'bg-white dark:bg-surface-800/50' : 'bg-surface-50 dark:bg-surface-800'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono">{row.operation}</td>
                      <td className="py-3 px-4 font-mono font-medium text-primary">{row.result}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!number && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-surface-500 dark:text-surface-400"
        >
          <div className="mb-4">
            <Calculator size={48} className="mx-auto opacity-30" />
          </div>
          <p className="text-lg">Enter a number to generate tables</p>
        </motion.div>
      )}
    </div>
  )
}

export default MainFeature