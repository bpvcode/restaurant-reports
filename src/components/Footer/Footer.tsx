import { FC  } from "react";
import styles from './Footer.module.css'

const Footer: FC = () => {
    return (
<footer className="footer bg-[#191E29] relative pt-5">
    <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-[#696E79] flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
                <p className="text-sm text-[#01C38D] font-bold mb-2">
                    Copyright © 2022 Bruno Vilar
                </p>
            </div>
        </div>
    </div>
</footer>
    )
}

export default Footer;