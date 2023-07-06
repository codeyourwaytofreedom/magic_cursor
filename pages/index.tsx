import Head from 'next/head'
import { useState } from 'react'
import Items_slider from '../components/Items_slider'
import Layout from '../components/Layout'
import Slider_menu from '../components/slider';
import { countries } from '../components/product_bank';

export default function Home() {
  const [chosen, setChosen] = useState<string>("");
  return (
    <>
      <Head>
        <title>Magic Cursor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/magic.png" />
      </Head>
      <main>
            <Layout>
              <Items_slider setChosen={setChosen} chosen={chosen}/>
              <Slider_menu chosen={chosen} />
              <h1>{chosen && chosen}</h1>
            </Layout>
      </main>
    </>
  )
}
