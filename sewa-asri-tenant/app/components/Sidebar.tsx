"use client"
import menuIcon from "./../assets/icons/menu.png";
import dashboardIcon from "./../assets/icons/menu 1.png";
import chatIcon from "./../assets/icons/menu 2.png";
import reservationIcon from "./../assets/icons/menu 3.png";
import villaIcon from "./../assets/icons/menu 4.png";
import closeIcon from "./../assets/icons/close.png"
import logo from "./../assets/logo.png";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Image from "next/image";


type CurrentRouteRef = {
    dashboard: boolean;
    chat: boolean;
    villaManagement: boolean;
    reservationSchedule: boolean;
}

type MenuType = {
    // name: string;
    sidebarStatus: "opened" | "closed";
    // icon: string;
    routePath: "/dashboard" | "/chat" | "/reservation-schedule" | "/villa-management" | string;
}

export function Sidebar() {
    const [sidebarStatus, setSidebarStatus] = useState<"opened" | "closed">("closed");

    const router = useRouter();
    const routePath = router.pathname;

    return (
        <aside className={`sidebar sidebar-${sidebarStatus}`}>

            {
                sidebarStatus === "opened" ? (
                    <div className={`navigations navigations-${sidebarStatus}`}>
                        <Image src={logo}
                            className="sidebar-logo"
                            alt="sidebar-logo"
                        />

                        <Image src={closeIcon}
                            className="menu-icon"
                            alt="menu-icon"

                            onClick={() => {
                                setSidebarStatus("closed");
                            }}
                        />
                    </div>
                ) : (
                    <div className={`navigations navigations-${sidebarStatus}`}>
                        <Image src={menuIcon}
                            className="menu-icon"
                            alt="menu-icon"
                            onClick={() => {
                                setSidebarStatus("opened");
                            }}
                        />
                    </div>
                )
            }

            <nav className={`menus menus-${sidebarStatus}`}>
                <Menu sidebarStatus={sidebarStatus}
                    routePath={routePath}
                />
            </nav>
        </aside>
    );
}

function Menu({ sidebarStatus, routePath }: MenuType) {
    // const { id } = useParams({ strict: false });
    const router = useRouter();
    const { id } = router.query;
    const currentRouteRef = useRef<CurrentRouteRef>({
        dashboard: false,
        chat: false,
        villaManagement: false,
        reservationSchedule: false,
    });

    const routeMap = {
        "/dashboard": { dashboard: true },
        "/chat": { chat: true },
        "/reservation-schedule": { reservationSchedule: true },
        "/villa-management": { villaManagement: true },
        "/villa-management/create-new-villa": { villaManagement: true },
        [`/villa-management/villa-detail-description/${id}`]: { villaManagement: true }
    };

    currentRouteRef.current = {
        ...currentRouteRef.current,
        ...routeMap[routePath]
    };

    return (
        <>
            <Link href="/dashboard">
                <div className={`menu dashboard-${currentRouteRef.current.dashboard}`}>

                    <Image src={dashboardIcon}
                        className={`menu-icon dashboard-icon-${currentRouteRef.current.dashboard}`} alt="dashboard-icon"
                    />

                    {
                        sidebarStatus === "opened" &&
                        <h4 className="label-regular menu-label">
                            Dashboard
                        </h4>
                    }
                </div>
            </Link>

            <Link href="/chat">
                <div className={`menu chat-${currentRouteRef.current.chat}`}>

                    <Image src={chatIcon}
                        className={`menu-icon chat-icon-${currentRouteRef.current.chat}`} alt="chat-icon"
                    />

                    {
                        sidebarStatus === "opened" &&
                        <h4 className="label-regular menu-label">
                            Chat
                        </h4>
                    }
                </div>
            </Link>

            <Link href="/reservation-schedule">
                <div className={`menu reservation-schedule-${currentRouteRef.current.reservationSchedule}`}>

                    <Image src={reservationIcon}
                        className={`menu-icon reservation-schedule-icon-${currentRouteRef.current.reservationSchedule}`}
                        alt="reservation-icon"
                    />

                    {
                        sidebarStatus === "opened" &&
                        <h4 className="label-regular menu-label">
                            Reservation schedule
                        </h4>
                    }
                </div>
            </Link>

            <Link href="/villa-management">
                <div className={`menu villa-management-${currentRouteRef.current.villaManagement}`}>

                    <Image src={villaIcon}
                        className={`menu-icon villa-management-icon-${currentRouteRef.current.villaManagement}` }
                        alt="villa-management icon "
                    />

                    {
                        sidebarStatus === "opened" &&
                        <h4 className="label-regular menu-label">
                            Villa management
                        </h4>
                    }
                </div>
            </Link>
        </>

    );
}