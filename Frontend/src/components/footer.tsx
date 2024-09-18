import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import discord from "../assets/discord.svg"
import youtube from "../assets/youtube.svg"
import { Link } from "wouter"
export default function Footer(){
    return(
        <div className="pt-52 hidden md:flex pb-6 items-end">
            <div className="pt-10">
                <Link href="/" className="block text-wrench-neutral-white text-2xl mb-2">wrench</Link>
                <p className="text-sm text-wrench-neutral-2">© Wrench LLC 2024</p>
                <p className="text-sm text-wrench-neutral-2">Los Angeles, Sigma street 69, apt 420F</p>
                <p className="text-sm text-wrench-neutral-2">Ohio 6969694</p>
            </div>
            <div className="m-auto">
                <div className="pt-10 flex gap-12">
                    <div>
                        <h5 className="text-wrench-neutral-white font-semibold mb-1">Resources</h5>
                        <Link href="/download" className="block text-sm text-wrench-neutral-1">Download</Link>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Developers</Link>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Support</Link>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Status</Link>
                    </div>
                    <div>
                        <h5 className="text-wrench-neutral-white font-semibold mb-1">Legal</h5>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Terms of Service</Link>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Privacy policy</Link>
                        <Link href="" className="block text-sm text-wrench-neutral-1">Cookies</Link>
                    </div>
                </div>
            </div>
            <div className="pt-10 sm:text-right">
                <Link href="" className="block text-sm text-wrench-neutral-white">Brand</Link>
                <Link href="" className="block text-sm text-wrench-neutral-white">Inquiries</Link>
                <div className="flex items-center">
                    <a href="https://www.facebook.com">
                        <img className="m-1" src={facebook} alt="facebook" width={17} height={17}/>
                    </a>
                    <a href="https://www.instagram.com">
                        <img className="m-1" src={instagram} alt="instagram" width={16} height={19}/>
                    </a>
                    <a href="https://www.discord.com">
                        <img className="m-1" src={discord} alt="discord" width={18} height={15}/>
                    </a>
                    <a href="https://www.youtube.com">
                        <img className="m-1" src={youtube} alt="youtube" width={18} height={15}/>
                    </a>
                </div>
            </div>
        </div>
    )
}