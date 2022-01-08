import { fauna } from "../../../services/fauna";
import {query as q} from "faunadb";
import { stripe } from "../../../services/stripe";


export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
){
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )


  const sub  = await stripe.subscriptions.retrieve(subscriptionId)

  const subData ={
    id: sub.id,
    userId: userRef,
    status: sub.status,
    price_id: sub.items.data[0].price.id

  }

  if (createAction) {
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {data: subData}
      )
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ), {data: subData}
      )
    )

  }
}