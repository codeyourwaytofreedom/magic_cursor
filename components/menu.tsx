import h from "../styles/Homie.module.css";
import Image from "next/image";

const Menu = () => {
    return ( <>
            <div className={h.homie_menu}>
                <div className={h.homie_menu_clicks}>
                    {
                        [...Array(6)].map((e,i)=>
                        <>
                                            <button>
                        <Image src={"/flat.png"} alt={"oil"} width={70} height={90}/>
                        <div id={h.text}>Flat</div>
                    </button>
                    <button>
                        <Image src={"/oil.png"} alt={"oil"} width={70} height={90}/>
                        <div id={h.text}>Oil</div>
                    </button>
                    <button>
                        <Image src={"/milk.png"} alt={"oil"} width={70} height={90}/>
                        <div id={h.text}>Milk</div>
                    </button>
                        </>
                        )
                    }
                </div>
            </div>
    </> );
}
 
export default Menu;