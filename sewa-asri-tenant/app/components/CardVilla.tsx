"use client"
import { Button } from ".";
import Image from "next/image";
import pinIcon from "./../assets/icons/location.webp";
import chevronIcon from "./../assets/icons/chevron-down.webp";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { DetailVillaInterface, VillaInterface } from "../utils/villa-interfaces";

interface Status {
    isAvailable: boolean;
    dropdownHandler?: () => void;
}

interface DropdownActions {
    _id: string;
    dropdown: "opened" | "closed";
    onMouseLeaveHandler: () => void;
}

interface DropdownStatus {
    dropdown: "opened" | "closed";
    onMouseLeaveHandler: () => void;
    onChangeAvailabilityHandler?: () => void;
}

export function CardVilla({
    data,
    onChangeAvailabilityHandler
}: {
    data: VillaInterface | DetailVillaInterface,
    onChangeAvailabilityHandler?: () => void;
}) {
    const [dropdownStatus, setDropdownStatus] = useState<"opened" | "closed">("closed");
    const [dropdownActions, setDropdownActions] = useState<"opened" | "closed">("closed");
    const [isAvailable, setIsAvailable] = useState<boolean>(data.isAvailable);

    return (
        <article className="card-villa" key={data._id}>
            <img src={data.photo}
                className="photo"
                loading="lazy"
            />

            <section className="content">

                <section className="villaid-status-wrapper">

                    <p className="label-regular villaid"
                        onClick={(event) => {
                            const text = event.currentTarget.textContent;
                            // copyToClipboard(text)
                            console.info(text);
                        }}>
                        Villa ID: {data._id}
                    </p>

                    <Status isAvailable={isAvailable}

                        dropdownHandler={() => {
                            setDropdownStatus("opened");
                        }}
                    />

                    <DropdownStatus dropdown={dropdownStatus}
                        onMouseLeaveHandler={() => {
                            setDropdownStatus("closed");
                        }}
                        onChangeAvailabilityHandler={() => {
                            if (onChangeAvailabilityHandler) {
                                onChangeAvailabilityHandler();
                            }
                            isAvailable ? setIsAvailable(false) : setIsAvailable(true);
                            setDropdownStatus("closed");
                        }} />
                </section>

                <section className="name-price-wrapper">

                    <h3 className="h3-regular name">
                        {data.name}
                    </h3>

                    <section className="price-wrapper">
                        <h4 className="h4-regular">
                            Rp. {data.price}
                        </h4>

                        <p className="label-regular">/ malam</p>
                    </section>
                </section>

                <section className="city-actions-wrapper">
                    <section className="city">

                        <Image src={pinIcon}
                            className="location-icon"
                            alt="location-icon"
                        />
                        <p className="label-regular">
                            {data.location.city}
                        </p>
                    </section>

                    <Button variant="tertiary"
                        behavior="hug-content"
                        size="small"
                        state="active"
                        label="Actions"

                        onClickHandler={() => {
                            setDropdownActions("opened");
                        }}
                    />

                    <DropdownActions _id={data._id}
                        dropdown={dropdownActions}

                        onMouseLeaveHandler={() => {
                            setDropdownActions("closed");
                        }}
                    />
                </section>
            </section>
        </article>
    );
}

function Status({
    isAvailable,
    dropdownHandler
}: Status) {
    return (
        <section className="villa-availability"

            onClick={() => {
                if (dropdownHandler) {
                    dropdownHandler();
                }
            }}>
            {
                isAvailable ? (
                    <>
                        <div className="dot green-dot" />

                        <p className="label-regular label">
                            Tersedia
                        </p>
                    </>
                ) : (
                    <>
                        <div className="dot red-dot" />

                        <p className="label-regular label">
                            Tidak tersedia
                        </p>
                    </>
                )
            }

            <Image src={chevronIcon} alt="chevron"
                className="chevron" />
        </section>
    );
}

function DropdownStatus({ dropdown, onMouseLeaveHandler, onChangeAvailabilityHandler }: DropdownStatus) {
    return (
        <section className={`dropdown-status dropdown-status-${dropdown}`}
            onMouseLeave={() => {
                if (onMouseLeaveHandler) {
                    onMouseLeaveHandler();
                }
            }}>

            <article className="option"
                onClick={() => {
                    if (onChangeAvailabilityHandler) {
                        onChangeAvailabilityHandler();
                    }
                }}>

                <div className="dot green-dot" />

                <p className="label-regular label">
                    Tersedia
                </p>
            </article>

            <article className="option"
                onClick={() => {
                    if (onChangeAvailabilityHandler) {
                        onChangeAvailabilityHandler();
                    }
                }}>

                <div className="dot red-dot" />

                <p className="label-regular label">
                    Tidak tersedia
                </p>
            </article>
        </section>
    );
}

function DropdownActions({
    _id,
    dropdown,
    onMouseLeaveHandler
}: DropdownActions) {
    const router = useRouter()

    return (
        <section className={`dropdown-actions dropdown-actions-${dropdown}`}
            onMouseLeave={() => {
                if (onMouseLeaveHandler) {
                    onMouseLeaveHandler();
                }
            }}>

            <p className="label-regular view"
                onClick={() => {
                    router.push(`/villa-detail-description/${_id}`);
                }}>
                View detail
            </p>

            <p className="label-regular edit"

                onClick={() => {
                      router.push(`/villa-detail-description/${_id}`);
                }}>
                Edit
            </p>

            <p className="label-regular delete"

                onClick={() => {

                }}>
                Delete
            </p>
        </section>
    );
}