'use client'
import Link from "next/link"
import logo from "@/app/assets/logo.png";
import calendarIcon from "@/app/assets/icons/calendar.png";
import bellIcon from "@/app/assets/icons/bell.png";
import { getUser } from "../utils/userStore";
import { Button } from '.';
import Image from "next/image";
import { useRouter } from 'next/navigation'

interface PageHeaderInterface {
    variant?: "auth" | "main";
    onHoverProfile?: () => void;
}

interface AuthHeaderInterface extends PageHeaderInterface {
    user: {
        name: string;
        photo: string;
    } | null;
    dayMap: object | any;
    monthMap: object | any;
}

export function PageHeader({ variant = "main", onHoverProfile }: PageHeaderInterface) {

    const user = getUser();

    const dayMap = {
        "0": "Minggu",
        "1": "Senin",
        "2": "Selasa",
        "3": "Rabu",
        "4": "Kamis",
        "5": "Jumat",
        "6": "Sabtu"
    }

    const monthMap = {
        "0": "Januari",
        "1": "Februari",
        "2": "Maret",
        "3": "April",
        "4": "Mei",
        "5": "Juni",
        "6": "Juli",
        "7": "Agustus",
        "8": "Oktober",
        "9": "September",
        "10": "November",
        "11": "Desember"
    }

    const headerVariantMap = {
        auth: <Auth user={user}
            dayMap={dayMap}
            monthMap={monthMap}
            onHoverProfile={onHoverProfile}
        />,
        main: <Main />
    }

    return headerVariantMap[variant];
}

function Auth({ user, dayMap, monthMap, onHoverProfile }: AuthHeaderInterface) {
    const date = new Date;

    return (
        <header className="h-[90px] w-full flex justify-between items-center pt-[10px] pr-[50px] border-b border-solid border-neutral-200">

            <section className="flex items-center gap-[24px]">

                <Image src={calendarIcon}
                    className="w-[24px] h-[24px]"
                    alt="icon"
                />

                <article className="flex flex-col items-start gap-[2px]">

                    <h4 className="label-regular date">
                        {dayMap[date.getDay().toString()]}, {date.getDate()}
                    </h4>

                    <h4 className="label-regular month">
                        {monthMap[date.getMonth().toString()]}
                    </h4>
                </article>
            </section>

            <nav className="profile-notification-wrapper">

                <Image src={bellIcon}
                    className="icon"
                    alt="icon"
                    onClick={() => {
                        console.info("Notifications");
                    }}
                />

                <article className="account"
                    onMouseEnter={() => {
                        if (onHoverProfile) {
                            onHoverProfile()
                        }
                    }}
                >

                    <img src={
                        user?.photo === "default.jpg" ?
                            "https://randomuser.me/api/portraits/men/16.jpg"
                            :
                            user?.photo
                    }
                        className="photo-profile"
                    />

                    <h4 className={`p-regular name`}>
                        {user?.name}
                    </h4>
                </article>
            </nav>
        </header>
    );
}

function Main() {
    const router = useRouter()
    return (
        <header className="w-[100%] flex h-[100px] pt-[10px] pr-[16px] pl-[16px] justify-between items-center border border-[#EEEEEE] bg-[#FFFF] shadow-md">

            <Image className='w-[140px] h-[78.315px]' src={logo} alt="logo" />

            <nav className='flex h-50 justify-center items-center gap-[100px]'>

                <article className='inherit justify-center items-center gap-[24px]'>

                    <Link href="/" className='text-[#4D4D4D] hover:text-[#40BF40] px-2 py-1 no-underline font-medium'>
                        Home
                    </Link>

                    <Link href="/about-us" className='text-[#4D4D4D] hover:text-[#40BF40] px-2 py-1 no-underline font-medium'>
                        Tentang kami
                    </Link>

                    <Link href="/terms-and-conditions" className='text-[#4D4D4D] hover:text-[#40BF40] px-2 py-1 no-underline font-medium'>
                        Syarat dan ketentuan
                    </Link>
                </article>

                <section className='flex flex-row justify-center items-center gap-[16px]'>
                    <button className="text-label font-medium text-[#ffff] py-2 px-4 flex flex-row items-center justify-center gap-x-4 rounded-full border cursor-pointer bg-[#40BF40] h-[50px] min-w-[100px] hover:bg-[#808080] hover:text-[#FFFF]" onClick={() => {
                        router.push('/login')
                    }}>
                        Login
                    </button>
                 
                    <button className="bg-[#FFFF] rounded-full text-[#AFAFAF]  border-[1.5px] border-[#AFAFAF] h-[50px] min-w-[100px] hover:bg-[#FFFF] hover:text-[#808080]" onClick={() => {
                        router.push('/Register')
                    }}>
                        Register
                    </button>
                    
                </section>
            </nav>
        </header>
    );
}