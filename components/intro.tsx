import h from "../styles/Homie.module.css";





const Intro = () => {
    return ( <>
        <div className={h.homie_intro}>
                <div id={h.back}>&#10094;</div>
                <div id={h.forth}>&#10095;</div>
            <div className={h.homie_intro_shell}>
                <div className={h.homie_intro_shell_each}>One</div>
                <div className={h.homie_intro_shell_each}>Two</div>
                <div className={h.homie_intro_shell_each}>Three</div>
                <div className={h.homie_intro_shell_each}>Four</div>
            </div>
        </div>
    
    </> );
}
 
export default Intro;