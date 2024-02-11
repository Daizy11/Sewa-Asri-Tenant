import { IMessageBar } from "../utils/interface";
import warningBlue from "./../assets/icons/warning-blue.webp";
import warningRed from "./../assets/icons/warning-red.webp";
import warningGreen from "./../assets/icons/warning-green.webp";
import Image from "next/image";

export function MessageBar({ message, variant = "info", showMessageBar }: IMessageBar) {
    return (
        <article    className={`message-bar message-bar-${variant} show-message-bar-${showMessageBar}`}>
            <Icon variant={variant}/>
            <h4 className="p-regular" >
                {message}
            </h4>
        </article>
    );
}

function Icon({ variant } :any  ) {
    switch (variant) {
        case "info":
            return <Image alt="icon" className={`icon`} src={warningBlue}/>

        case "error":
            return <Image alt="icon" className={`icon`} src={warningRed}/>

        case "success":
            return <Image alt="icon" className={`icon`} src={warningGreen}/>
    
    }
}