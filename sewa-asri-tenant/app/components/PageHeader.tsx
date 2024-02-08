// import { Link, useNavigate } from '@tanstack/react-router'
import Link from "next/link"
import logo from "./../assets/logo.png";
import calendarIcon from "./../assets/icons/calendar.png";
import bellIcon from "./../assets/icons/bell.png";
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
    dayMap: object |any;
    monthMap: object |any;
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
        <header className=" header-auth">

            <section className="header-auth-date">

                <Image src={calendarIcon}
                    className="icon"
                    alt="icon"
                />

                <article className="header-auth-date-detail">

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
        <header className="header-main">

            <Image className='logo'
                src={logo} alt="logo" />

            <nav className='navigations'>

                <article className='menus'>

                    <Link href="/" className='link label-regular'>
                        Home
                    </Link>

                    <Link href="/about-us" className='link label-regular'>
                        Tentang kami
                    </Link>

                    <Link href="/terms-and-conditions" className='link label-regular'>
                        Syarat dan ketentuan
                    </Link>
                </article>


                <section className='actions'>
                    <Button variant="primary"
                        behavior="hug-content"
                        size="large"
                        state="active"
                        label="Login"

                        onClickHandler={() => {
                            router.push('/login')

                        }}
                    />

                    <Button variant="secondary"
                        behavior="hug-content"
                        size="large"
                        state="active"
                        label="Register"

                        onClickHandler={() => {
                            router.push('/login')
                        }}
                    />
                </section>
            </nav>
        </header>
    );
}