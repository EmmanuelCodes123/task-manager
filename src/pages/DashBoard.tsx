import Main from "../components/Main";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function Dashboard() {
    return <div >
        <Navbar />
        <div className="flex ">
            <SideBar />
            <Main />
        </div>
    </div>
}