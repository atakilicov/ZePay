import React, { useState, useEffect } from 'react'
import './App.css'

// Logo/Vault SVG Component
const VaultIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="10" width="40" height="35" rx="4" fill="#F7F9F9" stroke="#2A9D8F" strokeWidth="2"/>
    <rect x="10" y="15" width="30" height="25" rx="2" fill="#E0F5F3" stroke="#2A9D8F" strokeWidth="2"/>
    <circle cx="35" cy="25" r="3" fill="#264653"/>
    <circle cx="35" cy="25" r="1.5" fill="#A8DADC"/>
    <circle cx="22" cy="25" r="8" fill="#A8DADC" stroke="#2A9D8F" strokeWidth="1.5"/>
    <line x1="22" y1="25" x2="22" y2="20" stroke="#264653" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="25" x2="26" y2="25" stroke="#264653" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Stellar address validation function
const isValidStellarAddress = (address: string): boolean => {
  // Stellar addresses start with 'G' and are 56 characters long
  const stellarAddressRegex = /^G[A-Z0-9]{55}$/
  return stellarAddressRegex.test(address)
}

// Navigation Component
const Navigation = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }: {
  activeTab: string
  setActiveTab: (tab: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}) => {
  const tabs = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'assign', label: 'Maaş Ata' },
    { id: 'status', label: 'Durum' },
    { id: 'claim', label: 'Talep Et' },
    { id: 'faq', label: 'SSS' }
  ]

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <VaultIcon />
              <span className="ml-2 text-xl font-semibold text-[#264653]">ZePay</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-link font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'text-[#2A9D8F]' 
                      : 'text-[#264653] hover:text-[#2A9D8F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <button className="gradient-button text-white px-5 py-2 rounded-md font-medium hidden md:block">
              Cüzdan Bağla
            </button>
            
            <button 
              className="md:hidden text-[#264653]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 p-6 transform transition-transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <VaultIcon />
            <span className="ml-2 text-xl font-semibold text-[#264653]">ZePay</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <svg className="w-6 h-6 text-[#264653]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setMobileMenuOpen(false)
              }}
              className="text-[#264653] hover:text-[#2A9D8F] transition-colors py-2 border-b border-gray-100 text-left"
            >
              {tab.label}
            </button>
          ))}
          <button className="gradient-button text-white px-5 py-2 rounded-md font-medium mt-4">
            Cüzdan Bağla
          </button>
        </div>
      </div>
    </>
  )
}

// Home Tab Component
const HomeTab = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Güvenli Zaman Kilitli Maaş Ödemeleri</h1>
      <p className="text-lg mb-8 text-gray-600">
        ZePay, işverenlerin belirli bir serbest bırakma tarihine kadar maaş ödemelerini planlayıp kilitlemelerini sağlayan 
        merkezi olmayan bir bordro kasasıdır.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          className="gradient-button text-white px-8 py-3 rounded-md font-medium"
          onClick={() => setActiveTab('assign')}
        >
          Maaş Ata
        </button>
        <button 
          className="bg-white border border-[#2A9D8F] text-[#2A9D8F] px-8 py-3 rounded-md font-medium hover:bg-[#F7F9F9] transition-colors"
          onClick={() => setActiveTab('claim')}
        >
          Maaş Talep Et
        </button>
      </div>
    </div>
    <div>
      <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="150" r="120" fill="#E0F5F3" />
        <rect x="120" y="70" width="160" height="160" rx="16" fill="#FFFFFF" stroke="#2A9D8F" strokeWidth="4" />
        <rect x="140" y="90" width="120" height="120" rx="8" fill="#F7F9F9" stroke="#2A9D8F" strokeWidth="3" />
        <circle cx="240" cy="150" r="12" fill="#264653" />
        <circle cx="240" cy="150" r="8" fill="#A8DADC" />
        <circle cx="200" cy="150" r="30" fill="#A8DADC" stroke="#2A9D8F" strokeWidth="3" />
        <circle cx="200" cy="150" r="3" fill="#264653" />
        <line x1="200" y1="150" x2="200" y2="130" stroke="#264653" strokeWidth="3" strokeLinecap="round" />
        <line x1="200" y1="150" x2="215" y2="150" stroke="#264653" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="110" r="12" fill="#F9D56E" stroke="#E9B949" strokeWidth="2" />
        <circle cx="180" cy="100" r="12" fill="#F9D56E" stroke="#E9B949" strokeWidth="2" />
        <circle cx="155" cy="190" r="12" fill="#F9D56E" stroke="#E9B949" strokeWidth="2" />
        <circle cx="175" cy="200" r="12" fill="#F9D56E" stroke="#E9B949" strokeWidth="2" />
        <rect x="220" y="110" width="30" height="4" rx="2" fill="#2A9D8F" />
        <rect x="220" y="120" width="20" height="4" rx="2" fill="#2A9D8F" />
        <rect x="220" y="180" width="30" height="4" rx="2" fill="#2A9D8F" />
        <rect x="220" y="190" width="20" height="4" rx="2" fill="#2A9D8F" />
      </svg>
    </div>
    
    <div className="md:col-span-2 mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Nasıl Çalışır</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-8 text-center">
          <div className="bg-[#E0F5F3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">1. Maaş Ata</h3>
          <p className="text-gray-600">İşverenler, belirli bir serbest bırakma tarihi ile çalışan Stellar cüzdan adreslerine maaş ödemeleri atar.</p>
        </div>
        
        <div className="card p-8 text-center">
          <div className="bg-[#E0F5F3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">2. Zaman Kilitli Kasa</h3>
          <p className="text-gray-600">Fonlar, belirtilen serbest bırakma tarihine kadar zaman kilitli kasada güvenle saklanır.</p>
        </div>
        
        <div className="card p-8 text-center">
          <div className="bg-[#E0F5F3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">3. Ödeme Talep Et</h3>
          <p className="text-gray-600">Çalışanlar, serbest bırakma tarihine ulaşıldığında maaşlarını talep edebilirler.</p>
        </div>
      </div>
    </div>
  </div>
)

// Assign Tab Component
const AssignTab = () => {
  const [formData, setFormData] = useState({
    employeeAddress: '',
    tokenAddress: 'xlm',
    customToken: '',
    amount: '',
    releaseDate: ''
  })
  const [feedback, setFeedback] = useState(false)
  const [addressError, setAddressError] = useState('')

  const validateAddress = (address: string) => {
    if (address && !isValidStellarAddress(address)) {
      setAddressError('Geçersiz Stellar adresi. Adres G ile başlamalı ve 56 karakter olmalıdır.')
      return false
    }
    setAddressError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAddress(formData.employeeAddress)) {
      return
    }
    
    setFeedback(true)
    setTimeout(() => {
      setFormData({
        employeeAddress: '',
        tokenAddress: 'xlm',
        customToken: '',
        amount: '',
        releaseDate: ''
      })
      setFeedback(false)
    }, 3000)
  }

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const hours = String(today.getHours()).padStart(2, '0')
    const minutes = String(today.getMinutes()).padStart(2, '0')
    
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`
    
    const releaseDateInput = document.getElementById('release-date') as HTMLInputElement
    if (releaseDateInput) {
      releaseDateInput.setAttribute('min', minDateTime)
    }
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Maaş Ata</h1>
      <div className="card p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="employee-address" className="block text-sm font-medium text-gray-700 mb-2">
              Çalışan Stellar Cüzdan Adresi
            </label>
            <input 
              type="text" 
              id="employee-address" 
              className={`input-field w-full ${addressError ? 'border-red-500' : ''}`}
              placeholder="G********" 
              required
              value={formData.employeeAddress}
              onChange={(e) => {
                setFormData({...formData, employeeAddress: e.target.value})
                validateAddress(e.target.value)
              }}
              maxLength={56}
            />
            {addressError && (
              <p className="text-red-500 text-sm mt-1">{addressError}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Stellar adresi G ile başlamalı ve 56 karakter olmalıdır.</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="token-address" className="block text-sm font-medium text-gray-700 mb-2">
              Token Türü
            </label>
            <div className="relative">
              <select 
                id="token-address" 
                className="input-field w-full appearance-none pr-10"
                value={formData.tokenAddress}
                onChange={(e) => setFormData({...formData, tokenAddress: e.target.value})}
              >
                <option value="xlm">XLM (Stellar Lumens)</option>
                <option value="usdc">USDC</option>
                <option value="test-token">Test Token</option>
                <option value="custom">Özel Token</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {formData.tokenAddress === 'custom' && (
            <div className="mb-6">
              <label htmlFor="custom-token" className="block text-sm font-medium text-gray-700 mb-2">
                Özel Token Adresi
              </label>
              <input 
                type="text" 
                id="custom-token" 
                className="input-field w-full" 
                placeholder="Stellar token adresi..."
                value={formData.customToken}
                onChange={(e) => setFormData({...formData, customToken: e.target.value})}
              />
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Miktar
            </label>
            <input 
              type="number" 
              id="amount" 
              className="input-field w-full" 
              placeholder="100.00" 
              min="0" 
              step="0.0000001" 
              required
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="release-date" className="block text-sm font-medium text-gray-700 mb-2">
              Serbest Bırakma Tarihi
            </label>
            <div className="datetime-picker relative">
              <input 
                type="datetime-local" 
                id="release-date" 
                className="input-field w-full pr-10" 
                required
                value={formData.releaseDate}
                onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="gradient-button text-white px-6 py-3 rounded-md font-medium w-full disabled:opacity-50"
            disabled={!!addressError}
          >
            Maaş Ata
          </button>
        </form>
        
        {feedback && (
          <div className="mt-6 p-4 bg-[#E0F5F3] rounded-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#2A9D8F] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-[#2A9D8F] font-medium">Maaş başarıyla kasaya kilitlendi.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Status Tab Component  
const StatusTab = () => {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<{amount: string, releaseDate: string, timeRemaining: string} | null>(null)
  const [addressError, setAddressError] = useState('')

  const validateAddress = (address: string) => {
    if (address && !isValidStellarAddress(address)) {
      setAddressError('Geçersiz Stellar adresi. Adres G ile başlamalı ve 56 karakter olmalıdır.')
      return false
    }
    setAddressError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAddress(address)) {
      return
    }
    
    // Mock data for demo
    setStatus({
      amount: '100 XLM',
      releaseDate: '1 Haziran 2025 – 12:00',
      timeRemaining: '3 gün 4 saat'
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Maaş Durumunu Kontrol Et</h1>
      <div className="card p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="status-address" className="block text-sm font-medium text-gray-700 mb-2">
              Stellar Cüzdan Adresiniz
            </label>
            <input 
              type="text" 
              id="status-address" 
              className={`input-field w-full ${addressError ? 'border-red-500' : ''}`}
              placeholder="GBSGBVZF57JTAJURUZWYLRRBKA6W6Q3TAUHLM37OVUW3ALLEY4SR6PUE" 
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                validateAddress(e.target.value)
              }}
              maxLength={56}
            />
            {addressError && (
              <p className="text-red-500 text-sm mt-1">{addressError}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="gradient-button text-white px-6 py-3 rounded-md font-medium w-full disabled:opacity-50"
            disabled={!!addressError}
          >
            Durumu Kontrol Et
          </button>
        </form>
        
        {status && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Maaş Bilgileri</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <div className="bg-[#E0F5F3] p-2 rounded-md mr-4">
                  <svg className="w-6 h-6 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Serbest Bırakma Tarihi</p>
                  <p className="font-medium">{status.releaseDate}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E0F5F3] p-2 rounded-md mr-4">
                  <svg className="w-6 h-6 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Miktar</p>
                  <p className="font-medium">{status.amount}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E0F5F3] p-2 rounded-md mr-4">
                  <svg className="w-6 h-6 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kalan Süre</p>
                  <p className="font-medium">{status.timeRemaining}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Claim Tab Component
const ClaimTab = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState<'none' | 'not-ready' | 'ready' | 'success'>('none')
  const [addressError, setAddressError] = useState('')

  const validateAddress = (address: string) => {
    if (address && !isValidStellarAddress(address)) {
      setAddressError('Geçersiz Stellar adresi. Adres G ile başlamalı ve 56 karakter olmalıdır.')
      return false
    }
    setAddressError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAddress(address)) {
      return
    }
    
    // Mock random result for demo
    const isReady = Math.random() > 0.5
    setMessage(isReady ? 'ready' : 'not-ready')
  }

  const handleClaim = () => {
    setMessage('success')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Maaş Talep Et</h1>
      <div className="card p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="claim-address" className="block text-sm font-medium text-gray-700 mb-2">
              Stellar Cüzdan Adresiniz
            </label>
            <input 
              type="text" 
              id="claim-address" 
              className={`input-field w-full ${addressError ? 'border-red-500' : ''}`}
              placeholder="GBSGBVZF57JTAJURUZWYLRRBKA6W6Q3TAUHLM37OVUW3ALLEY4SR6PUE" 
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                validateAddress(e.target.value)
              }}
              maxLength={56}
            />
            {addressError && (
              <p className="text-red-500 text-sm mt-1">{addressError}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="gradient-button text-white px-6 py-3 rounded-md font-medium w-full disabled:opacity-50"
            disabled={!!addressError}
          >
            Müsaitliği Kontrol Et
          </button>
        </form>
        
        {message === 'not-ready' && (
          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <p className="text-amber-700 font-medium">Henüz zamanı gelmedi. Lütfen daha sonra tekrar kontrol edin.</p>
            </div>
            <div className="mt-4 pl-12">
              <p className="text-sm text-amber-600">Maaşınız 1 Haziran 2025 saat 12:00'da kullanılabilir olacak.</p>
            </div>
          </div>
        )}
        
        {message === 'ready' && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-green-700 font-medium">Maaşınız hazır! Talep etmek için aşağıya tıklayın.</p>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={handleClaim}
                className="gradient-button text-white px-8 py-3 rounded-md font-medium"
              >
                Maaş Talep Et
              </button>
            </div>
          </div>
        )}
        
        {message === 'success' && (
          <div className="mt-8 p-8 text-center">
            <div className="success-animation">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Ödeme Başarılı!</h3>
              <p className="text-gray-600">Ödemeniz başarıyla transfer edildi.</p>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500">İşlem Hash'i</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">a2f8c9d1e3b4567890abcdef1234567890abcdef1234567890abcdef12345678</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// FAQ Tab Component
const FAQTab = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "ZePay nasıl çalışır?",
      answer: "ZePay, Stellar blockchain üzerinde zaman kilitli maaş kasaları oluşturmak için Soroban smart contract teknolojisini kullanır. İşverenler, belirli bir serbest bırakma tarihi ile çalışan Stellar cüzdan adreslerine maaş atayabilirler. Fonlar, serbest bırakma tarihine ulaşılana kadar akıllı kontrat içinde güvenle saklanır ve ardından çalışanlar maaşlarını talep edebilirler."
    },
    {
      question: "Hangi kripto para birimleri destekleniyor?",
      answer: "ZePay şu anda XLM (Stellar Lumens), USDC ve test tokenimizi desteklemektedir. Stellar ağı üzerindeki diğer tokenlar için özel token adresi sağlayarak da kullanılabilir. Sürekli olarak daha fazla Stellar tabanlı asset desteği eklemek için çalışıyoruz."
    },
    {
      question: "Stellar adresi nasıl görünür?",
      answer: "Stellar adresleri 'G' harfi ile başlar ve 56 karakter uzunluğundadır. Örnek: GBSGBVZF57JTAJURUZWYLRRBKA6W6Q3TAUHLM37OVUW3ALLEY4SR6PUE. Bu format Stellar ağında tüm hesaplar için standarttır."
    },
    {
      question: "Herhangi bir ücret var mı?",
      answer: "ZePay, platformu sürdürmek için işlem başına %0.5'lik küçük bir ücret alır. Ayrıca Stellar ağında her işlem için minimal network ücretleri (yaklaşık 0.00001 XLM) de uygulanır."
    },
    {
      question: "Cüzdan kimlik bilgilerimi kaybedersem ne olur?",
      answer: "Merkezi olmayan bir platform olarak ZePay, cüzdan kimlik bilgilerinizi saklamaz. Stellar secret key'inizi veya mnemonic kelimelerinizi güvenli tutmak çok önemlidir. Cüzdanınıza erişimi kaybederseniz, fonlarınızı kurtaramayız. Donanım cüzdanı veya güvenli cüzdan yönetim çözümü kullanmanızı öneririz."
    },
    {
      question: "Planlanmış bir ödemeyi iptal edebilir miyim?",
      answer: "İşverenler, serbest bırakma tarihinden önce planlanmış ödemeleri iptal edebilirler. Serbest bırakma tarihine ulaşıldığında, ödeme çalışan için kullanılabilir hale gelir ve iptal edilemez."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Sıkça Sorulan Sorular</h1>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="card p-6 mb-4">
            <button 
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <svg 
                className={`w-5 h-5 text-[#2A9D8F] transform transition-transform ${
                  openFaq === index ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openFaq === index && (
              <div className="mt-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Footer Component
const Footer = () => (
  <footer className="bg-gray-100 py-12">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-6">
            <VaultIcon />
            <span className="ml-2 text-xl font-semibold text-[#264653]">ZePay</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">Stellar blockchain teknolojisi ile desteklenen güvenli, zaman kilitli maaş ödemeleri.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-[#2A9D8F] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#2A9D8F] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Ürün</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Özellikler</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Güvenlik</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Fiyatlandırma</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">API</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Kaynaklar</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Dokümantasyon</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Destek</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Topluluk</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Şirket</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Hakkında</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Kariyer</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">İletişim</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#2A9D8F] transition-colors">Yasal</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">&copy; 2023 ZePay. Tüm hakları saklıdır.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-gray-500 hover:text-[#2A9D8F] transition-colors">Gizlilik Politikası</a>
          <a href="#" className="text-sm text-gray-500 hover:text-[#2A9D8F] transition-colors">Kullanım Şartları</a>
          <a href="#" className="text-sm text-gray-500 hover:text-[#2A9D8F] transition-colors">Çerez Politikası</a>
        </div>
      </div>
    </div>
  </footer>
)

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} />
      case 'assign':
        return <AssignTab />
      case 'status':
        return <StatusTab />
      case 'claim':
        return <ClaimTab setActiveTab={setActiveTab} />
      case 'faq':
        return <FAQTab />
      default:
        return <HomeTab setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="fade-in">
          {renderActiveTab()}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App 