
import FloatingContact from "../Page/Components/BtnContact/BtnContac";
import ScrollToTopButton from "../Page/Components/BtnCuonDau/btnCuon";
import Footer from "./Footer/Footer";
import Header from "./index";
interface LayOutMainProp {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayOutMainProp> = ({ children }) => {
  return (
    <div>
        <Header />
          <div> 
            {children}
        </div>
        <ScrollToTopButton/>
        <FloatingContact/>
        <Footer/>
    </div>
  );
};

export default MainLayout;
