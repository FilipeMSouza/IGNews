import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubsicribeButtonProps{
    priceId: string;
}


export function SubsicribeButton({priceId}:SubsicribeButtonProps){
  
  const {data:session} = useSession();

  const router = useRouter();

  async function handleSubsicribe(){
    if(!session){
      signIn('github')
      return
    }

    if(session?.activeSubscription){
      router.push('/posts')
      return
    }

    try{
      const response = await api.post('/subscribe')

      const{ sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})

    }catch (err) { 
      alert(err.message);
    }

  }
  
  return (

    <button
    className={styles.subsicribeButton}
    type="button"
    onClick={handleSubsicribe}
    >
      Subscribe Now
    </button>

  );
}