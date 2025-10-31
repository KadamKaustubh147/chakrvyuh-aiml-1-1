
import sideImg from "../assets/side.jpg?format=webp";
const SideImg = () => {
    return (

        <div className="w-2/5 hidden md:block">
            <div
                className="w-full h-full bg-cover bg-bottom"
                style={{ backgroundImage: `url(${sideImg})` }}
            />
        </div>
    )
}

export default SideImg
