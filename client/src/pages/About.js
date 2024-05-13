import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce App'}>
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">About Us</h3>
            </div>
          </header>
          <main role="main" className="inner cover">
            <p className="lead">Welcome to Ecommerce App, your premier destination for the latest tech gadgets! We pride ourselves on offering a curated selection of cutting-edge products sourced from leading manufacturers. With a focus on quality, innovation, and customer satisfaction, we aim to provide a seamless shopping experience for tech enthusiasts of all levels. Join us as we explore the exciting world of technology together!</p>
          </main>
        </div>

    </Layout>
  )
}


export default About