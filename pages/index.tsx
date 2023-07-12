import Head from 'next/head'
import { useEffect, useState } from 'react'
import Items_slider from '../components/Items_slider'
import Layout from '../components/Layout'
import Slider_menu from '../components/slider';

export default function Home() {


  const [chosen, setChosen] = useState<string>("");

  type XY = {
    x:number,
    y:number
  }
  const [wander_XYs, setWander_XYs] = useState<XY[]>([]);
  const [click_XYs, setClick_XYs] = useState<XY[]>([]);


  useEffect(() => {
    const handle_MouseMove = (event:MouseEvent) => {
      console.log(event.clientX, event.clientY);
      setWander_XYs(prev => [...prev, {x:event.clientX, y:event.clientY}])
    };

    window.addEventListener('mousemove', handle_MouseMove);

    return () => {
      window.removeEventListener('mousemove', handle_MouseMove);
    };
  }, []);

  useEffect(() => {
    const handle_Click = (event:MouseEvent) => {
      setClick_XYs(prev => [...prev, {x:event.clientX, y:event.clientY}])
    };

    window.addEventListener('click', handle_Click);

    return () => {
      window.removeEventListener('click', handle_Click);
    };
  }, []);


  useEffect(() => {
    const handleBeforeUnload = () => {
      fetch("/api/hm",{
        method:"POST",
        body:JSON.stringify({wander:wander_XYs, clicks:click_XYs})
      })
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [wander_XYs, click_XYs]);


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
              <h1>{wander_XYs.length}</h1>
            </Layout>
      </main>
    </>
  )
}
