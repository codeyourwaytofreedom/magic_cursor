import h from "../styles/Homie.module.css";
import Image from "next/image";

const Menu = () => {
    return ( <>
            <div className={h.homie_menu}>
                <div className={h.homie_menu_clicks}>
                    <button>
                        <Image src={"/oil.png"} alt={"oil"} width={70} height={90}/>
                    </button>
                    <button>
                        <Image src={"/milk.png"} alt={"oil"} width={70} height={90}/>
                        <div id={h.text}>Oil</div>
                    </button>
                </div>
            </div>
    </> );
}
 
export default Menu;