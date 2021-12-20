import {GetServerSideProps} from 'next';
import Head from 'next/head';

import { SubsicribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }

}


export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Wlcome</span>

          <h1>News About the <span>React</span> world.</h1>

          <p>
            Get access to all the all published articles<br/> 
            <span>for {product.amount} month</span>  
          </p>

          <SubsicribeButton priceId={product.priceId}/>
        </section>      
      
        <img src="/images/avatar.svg" alt="Gril Coding" />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1K8qBEHskhuV51zhrX7BZFtJ')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount /100)  ,
  }

  return {
    props:{
      product
    }
  }
  
}