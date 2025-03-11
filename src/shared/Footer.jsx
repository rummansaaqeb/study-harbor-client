import logo from '../assets/logo-bgremoved.png';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-24">
            <aside>
                <img className='w-32 h-32 object-cover' src={logo} alt="" />
                <p>
                    ACME Industries Ltd.
                    <br />
                    Providing reliable education since 2025
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="footer-underline cursor-pointer">Design</a>
                <a className="footer-underline cursor-pointer">Branding</a>
                <a className="footer-underline cursor-pointer">Marketing</a>
                <a className="footer-underline cursor-pointer">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="footer-underline cursor-pointer">About us</a>
                <a className="footer-underline cursor-pointer">Contact</a>
                <a className="footer-underline cursor-pointer">Jobs</a>
                <a className="footer-underline cursor-pointer">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="footer-underline cursor-pointer">Terms of use</a>
                <a className="footer-underline cursor-pointer">Privacy policy</a>
                <a className="footer-underline cursor-pointer">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;