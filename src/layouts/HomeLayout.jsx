import Banner from "../components/Banner";
import StudySessions from "../components/StudySessions";
import Tutors from "../components/Tutors";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const HomeLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <Navbar></Navbar>
                </nav>
                <section>
                    <Banner></Banner>
                </section>
            </header>
            <section className="mt-24">
                <StudySessions></StudySessions>
            </section>
            <section className="mt-24">
                <Tutors></Tutors>
            </section>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;