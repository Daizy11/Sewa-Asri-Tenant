import LogoSewaAsriTenantTransparent from "./../assets/Logo-Tenant-Large-Transparant.webp";
import LogoAsriTechTransparent from "./../assets/Logo-Asri-Tech-Transparant.webp";
import Image from 'next/image'
import Link from "next/link";

export function Footer() {
    return (
        <footer className="footer">

            <article className="product">
                <Image src={LogoSewaAsriTenantTransparent} className="logo" alt="logo"/>
                        
                <p className="p-regular">
                    Sewa Asri Tenant adalah produk dari Asri Tech yang dapat digunakan oleh pemilik villa untuk mengelola Jadwal Reservasi dan Villa, sampai bercakap dengan calon tamu.
                </p>
            </article>

            <article className="company">

                <Image src={LogoAsriTechTransparent} alt="logo"
                        className="logo"/>

                <p className="p-regular">
                    Asri Tech adalah kolektif yang terdiri dari para pengembang dan desainer muda yang bersemangat untuk belajar dan berkembang.
                </p>
            </article>

            <section className="links">

                <h4 className="h4-medium">
                    Links
                </h4>

                <Link href="/" className="label-regular">
                    Home
                </Link>

                <Link href="/" className="label-regular">
                    Tentang kami
                </Link>

                <Link href="/" className="label-regular">
                    Syarat dan ketentuan
                </Link>
            </section>
        </footer>
    );
}