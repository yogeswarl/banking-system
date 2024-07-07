import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const Home = () => {
  const loggedIn = {firstName: 'Adrian'}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transaction Efficiently." 
          />
          <TotalBalanceBox 
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.75}
          />
        </header>
      </div>
    </section>
  )
}

export default Home