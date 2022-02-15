import Loader from "react-js-loader";

export function Preloader() {
    return (
        <div className="preloader">
            <div className={"row"}>
                <div className={"item"}>
                    <Loader type="spinner-circle" bgColor={"#FFFFFF"} color={'#FFFFFF'} size={100} />
                </div>
            </div>
        </div>
    )
}