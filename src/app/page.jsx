import Title from "./components/MainContent/Title/Title";
// import Navbar from "./components/navbar";
import style from "./page.module.css";
import Skiils from "./components/MainContent/Skills/Skills";
// import Showcase from "./components/MainContent/projectShowcase/Showcase";

export default function Home() {
	return (
		<>
			<div className={style.main}>
				{/* <Navbar /> */}
				<Title />
				<Skiils />
				{/* <Showcase /> */}
			</div>
		</>
	);
}
