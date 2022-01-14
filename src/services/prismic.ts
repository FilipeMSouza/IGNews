import Prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown){
  const prismic = Prismic.client(
    process.env.PRISMC_ENDPOINT,
    {
      accessToken: process.env.PRISMC_ACCESS_TOKEN,
      req
    }
  )

  return prismic
}