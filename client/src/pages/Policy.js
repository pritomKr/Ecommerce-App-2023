import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privecy Policy - Ecommerce App"}>
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">Privacy Policy</h3>
            </div>
          </header>
          <main role="main" className="inner cover">
            <p className="lead">Our privacy policy at Ecommerce App is designed to safeguard your personal information. We collect data such as your name, email address, and payment details to process orders efficiently and provide support. Your browsing information helps us improve our website's performance. We prioritize data security and use trusted third-party services for transactions and shipping. You have the right to access, correct, or delete your information and can opt out of marketing communications at any time. We update our policy periodically and encourage you to review it. If you have any concerns, please contact us.</p>
          </main>
        </div>
    </Layout>
  )
}

export default Policy