import facebook from "../assets/Frame.png"
import instagram from "../assets/Frame-1.png"
import discord from "../assets/Frame-2.png"
import youtube from "../assets/Frame-3.png"
export default function Footer(){
    return(
        <div className="pt-72 sm:flex pb-5">
            <div>
                <p className="text-wrench-neutral-white text-2xl">wrench</p>
                <p className="text-sm text-wrench-neutral-3">© Wrench LLC 2024</p>
                <p className="text-sm text-wrench-neutral-3">Los Angeles, Sigma street 69, apt 420F</p>
                <p className="text-sm text-wrench-neutral-3">Ohio 6969694</p>
            </div>
            <div className="m-auto">
                <div className="flex">
                    <div className="pr-4">
                        <p className="text-wrench-neutral-white text-2xl">Resources</p>
                        <p className="text-sm text-wrench-neutral-1">Download</p>
                        <p className="text-sm text-wrench-neutral-1">Developers</p>
                        <p className="text-sm text-wrench-neutral-1">Support</p>
                        <p className="text-sm text-wrench-neutral-1">Status</p>
                    </div>
                    <div>
                        <p className="text-wrench-neutral-white text-2xl">Legal</p>
                        <p className="text-sm text-wrench-neutral-1">Terms of Service</p>
                        <p className="text-sm text-wrench-neutral-1">Privacy policy</p>
                        <p className="text-sm text-wrench-neutral-1">Cookies</p>
                    </div>
                </div>
            </div>
            <div className="pt-10 sm:text-right">
                <p className="text-sm text-wrench-neutral-white">Brand</p>
                <p className="text-sm text-wrench-neutral-white">Inquiries</p>
                <div className="flex sm:grid sm:grid-cols-4">
                    <a href="https://www.facebook.com">
                        <img className="m-1"src={facebook} alt="facebook" width={17} height={17}/>
                    </a>
                    <a href="https://www.instagram.com">
                        <img className="m-1"src={instagram} alt="instagram" width={16} height={19}/>
                    </a>
                    <a href="https://www.discord.com">
                        <img className="m-1"src={discord} alt="discord" width={18} height={15}/>
                    </a>
                    <a href="https://www.youtube.com">
                        <img className="m-1"src={youtube} alt="youtube" width={18} height={15}/>
                    </a>
                </div>
            </div>
        </div>
    )
}